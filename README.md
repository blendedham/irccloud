# IRCCloud Keep Alive Utility

A simple Cloudflare Workers application to keep your IRCCloud connection active!

This script is inspired by the version written in go by [osm](https://github.com/osm/icka/), but rewritten from the ground up in Javascript to run on Cloudflare Workers. Unlike that version, this fork can be completely deployed to and configured for Cloudflare Workers from the browser. Cloudflare Workers Secrets are used to store your IRCCloud credentials.

This code uses IRCCloud's [publicly-documented RPC API](https://github.com/irccloud/irccloud-tools/wiki).
While this script generally prevents IRCCloud disconnecting from IRC servers after 120 minutes of inactivity, it does not provide access to any other of the numerous features that are available in the [Pro version of IRCCloud](https://www.irccloud.com/pricing). Please support them if you can!

**IMPORTANT: This utility should not be used for critically-important connections. IRCCloud may still occasionally disconnect users (such as during a Cloudflare Workers outage), causing messages to be missed, even if this tool is used.**

Requirements
============
* A free IRCCloud account
* A free Cloudflare account

Detailed Setup Instructions
===========================
1. [Log into or sign up](https://dash.cloudflare.com/login) for a free Cloudflare account.
2. Go to the Workers section of your account.
3. If prompted, enter a hostname for your workers. This value does not matter for this application.
4. Click "Create a Service". (You can leave all values as default, but you may want to pick a descriptive name for your own purposes.) Then click "Create Service".
5. Click "Quick Edit". Delete all of the code shown at the left and replace it with the contents of [`index.js`](index.js) from this repository. Click "Save and Deploy".
6. Go back out of the editor, then go to Settings > Variables.
7. Click "Add Variable", enter `email` as the name, and your IRCCloud account email address as the value. IMPORTANT: Click "Encrypt" to protect your credential. Then click "Add Variable" again, and this time enter `password` as the name, and your IRCCloud account password as the value. IMPORTANT: Click "Encrypt" to protect your credential. These values are required to authenticate with IRCCloud and send a signal indicating an active client. While I understand some people might be reluctant to enter their credentials, [Secrets are encrypted and Cloudflare does actually recommend using them for storing authentication keys](https://blog.cloudflare.com/workers-secrets-environment/). Then, click "Save and Deploy".
8. Go to the Triggers tab, then click "Add Cron Trigger". Select the "Cron" tab and paste in `7 * * * *`. Click "Add Trigger".
9. You're all set! Optional but recommended: Return the main Workers screen and change your compute setting from "Standard" to "Green".

To update to later versions of this tool simply repeat these steps.

Migrating From GitHub Actions
=============================
In your repo, go to Settings > Actions > General > Disable Actions > Save. Or simply delete the repo entirely.

Migrating From Heroku
=====================
Simply delete the app from your Heroku account and delete your scheduled job on cron-job.org, then follow the steps above. (You should also be able to just leave everything as is and your Heroku app and cron-job.org job should automatically be disabled at the end of November/early December.) 
