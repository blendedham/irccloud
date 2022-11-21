async function handleScheduled(event) {
    // Fetch token
    let tokfetch = await fetch("https://www.irccloud.com/chat/auth-formtoken", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "referer": "https://www.irccloud.com/",
            "referrer-policy": "strict-origin-when-cross-origin"
        },
        "body": "_reqid=1",
        "method": "POST"
    });
    let tokfetchjson = await tokfetch.json();
    let formtoken = tokfetchjson.token;

    let loginfetch = await fetch("https://www.irccloud.com/chat/login", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-auth-formtoken": formtoken,
            "x-requested-with": "XMLHttpRequest",
            "referer": "https://www.irccloud.com/",
            "referrer-policy": "strict-origin-when-cross-origin"
        },
        "body": "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) + "&org_invite=&invite_url=&token=" + encodeURIComponent(formtoken) + "&_reqid=2",
        "method": "POST"
    });

    let loginfetchjson = await loginfetch.json();
    let wshost = loginfetchjson.websocket_host || "api-2.irccloud.com";
    let wspath = loginfetchjson.websocket_path || "/websocket/2";
    let sessiontoken = loginfetchjson.session;

    // Connect to stream
    let wsreq = await fetch("https://" + wshost + wspath + "?exclude_archives=1", {
        headers: {
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "origin": "https://www.irccloud.com",
            "upgrade": "WebSocket",
            "cookie": "session=" + sessiontoken + ";",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52"
        }
    });
    let ws = wsreq.webSocket;
    ws.accept();

    ws.close();
    return;
}

addEventListener("scheduled", (event) => {
    event.waitUntil(handleScheduled(event));
});