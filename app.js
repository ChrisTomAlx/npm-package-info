var info = require("package-info");
const Moment = require('moment');
const MomentRange = require('moment-range');
 
const moment = MomentRange.extendMoment(Moment);

'use strict';
var got = require('got');
var registryUrl = require('registry-url');
var Promise = require('pinkie-promise');




got(registryUrl + "pretty".toLowerCase())
		.then(function (data) {
			// var name 		= '';
			// var version 	= '';
			// var description = '';
			// var license 	= '';
			// var homepage 	= '';
			// var authorName = '';

			var dataParsed = JSON.parse(data.body);

			let name 		= dataParsed.name;
			let version 	= dataParsed.time;
       a(version);



		})
		.catch(function (err) {
			if (err.statusCode === 404) {
				err.message = 'Package doesn\'t exist';
			}

			throw err;
		});




let a =  (packageData) => {
  // let packageData = await info("cordova-plugin-document-scanner");
  let versionsData = packageData;
  let refinedVersionArr = [];
  // let refinedObject
  for (const key in versionsData) {
    if (versionsData.hasOwnProperty(key) && !isNaN(parseInt(key))) {
      // let version = versionsData[key].replace(/\./g,'')
      let d = {};
      d[parseFloat(key.split(".", 2).join("."))] = versionsData[key];
      refinedVersionArr.push(d);
    }
  }
  // console.log(
  //   refinedVersionArr.sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0])
  // );
  refinedVersionArr = refinedVersionArr.sort(
    (a, b) => Object.keys(a)[0] - Object.keys(b)[0]
  );

  let minor = [];
  let major = [];
  refinedVersionArr.forEach((element, i) => {
    if (i !== refinedVersionArr.length - 1) {
      let first = Object.keys(element)[0];
      let second = Object.keys(refinedVersionArr[i + 1])[0];

      if (first !== second) {
        const start = new Date(Object.values(element)[0]);
        const end = new Date(Object.values(refinedVersionArr[i + 1])[0]);
        const range = moment.range(start, end);
        let mdiff = range.diff("days");
        //check major
        if (parseInt(second) - parseInt(first) === 0) {
            minor.push(mdiff);
        } else {
            major.push(mdiff);
        }
      }
    }
  });
  console.log(major)
  console.log(minor)
}
