/**
 * KM Developers – enquiry handler (Google Apps Script)
 *
 * Saves every website enquiry to the bound Google Sheet and emails the team.
 * Setup steps are in the project README ("Enquiry form → Google Sheet + email").
 */

// Comma-separated list of addresses that should receive enquiry emails.
var NOTIFY_EMAILS = 'kmdeveloper@gmail.com';
var SHEET_NAME = 'Enquiries';
var HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Interested In', 'Message', 'Source', 'Page URL'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = parseBody_(e);

    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (secret && data.secret !== secret) {
      return json_({ ok: false, error: 'Unauthorized' });
    }
    if (!data.name || !data.phone) {
      return json_({ ok: false, error: 'Name and phone are required' });
    }

    var row = [
      new Date(),
      data.name,
      data.phone,
      data.email,
      data.project || 'General enquiry',
      data.message,
      data.source,
      data.page,
    ].map(function (value, i) {
      return i === 0 ? value : safeCell_(value);
    });
    getSheet_().appendRow(row);

    sendNotification_(data);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the web app URL in a browser to check it is deployed.
function doGet() {
  return json_({ ok: true, service: 'KM Developers enquiries' });
}

function parseBody_(e) {
  var data = {};
  if (e && e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }
  } else if (e && e.parameter) {
    data = e.parameter;
  }
  var out = {};
  ['name', 'phone', 'email', 'project', 'message', 'source', 'page', 'secret'].forEach(function (key) {
    out[key] = data[key] == null ? '' : String(data[key]).trim();
  });
  return out;
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#43461a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stop spreadsheet formula injection (values starting with = + - @).
function safeCell_(value) {
  var s = String(value || '');
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function escapeHtml_(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sendNotification_(data) {
  var rows = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || '—'],
    ['Interested in', data.project || 'General enquiry'],
    ['Message', data.message || '—'],
    ['Source', data.source || '—'],
    ['Page', data.page || '—'],
  ]
    .map(function (r) {
      return (
        '<tr><td style="padding:8px 12px;background:#faf7f2;font-weight:bold;width:140px">' +
        r[0] +
        '</td><td style="padding:8px 12px">' +
        escapeHtml_(r[1]).replace(/\n/g, '<br>') +
        '</td></tr>'
      );
    })
    .join('');

  var options = {
    to: NOTIFY_EMAILS,
    subject: 'New enquiry: ' + data.name + ' – ' + (data.project || 'General enquiry'),
    htmlBody:
      '<div style="font-family:Arial,sans-serif;color:#1c1712">' +
      '<h2 style="color:#8c4316;margin:0 0 12px">New website enquiry</h2>' +
      '<table style="border-collapse:collapse;border:1px solid #eee">' +
      rows +
      '</table></div>',
    name: 'KM Developers Website',
  };
  if (data.email) options.replyTo = data.email;
  MailApp.sendEmail(options);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
