const express = require('express');
const app = express();
const request = require('request');

// route
app.get('/join', (req, res) => {
	const client_id = '8gBoWz4UT2acXnEEN1iQPQ';
	const redirect_url = 'http://localhost:3000';
	const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_url}`;
	res.redirect(url);
});

app.get('/', (req, res) => {
	// code from url query
	const code = req.query.code;
	console.log(code);

	var options = {
		method: 'POST',
		url: 'https://zoom.us/oauth/token',
		qs: {
			grant_type: 'authorization_code',
			//The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
			code: code,
		headers: {
			/**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
			 **/
			Authorization:
				'Basadfasdfsic ' +
				Buffer.from(
					'8gBoWz4UT2acXnEEN1iQPQ:gAxl3Xc50TFM6dqRN40fLVG7fV91cBqQ'
				).toString('base64'),
		},
	};

	request.post(options, (err, response, body) => {
		if (err) {
			console.log(err);
		} else {
			console.log(body);asdfasdf
			const lol = JSON.parse(body);
			const url = `http://localhost:3000/createMeet?acc=${lol.access_token}`;
			console.log(url);
			res.redirect(url);
		}
	});
});

app.get('/createMeet', (req, res) => {asdfasd
	const url = `https://api.zoom.us/v2/users/me/meetings`;
	console.log(req.query.acc);
	const options = {
		method: 'POST',
		url: url,
		headers: {
			Authorization: `Bearer ${req.query.acc}`,
		},
		body: {
			topic: 'Test meeting',
			duration: '10',
			password: '123456',
			type: '1',
			agenda: 'test meet',
			start_time: '2021-08-11T12:30:00.000Z',
			settings: {
				host_video: true,
				participant_video: false,
				in_meeting: true,
				join_before_host: true,
				mute_upon_entry: true,
				approval_type: 1,
				audio: 'both',
				auto_recording: 'none',
			},
		},
		json: true,
	};

	request(options, (err, response, body) => {
		if (err) {
			console.log(err);
		} else {
			console.log(body);
			res.redirect(body.join_url);
		}
	});
});

// listen
app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
