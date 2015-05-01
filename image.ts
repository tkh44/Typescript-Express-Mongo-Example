import url = require('url');
import hq = require('hyperquest');
import fs = require('fs');
import gm = require('graphicsmagick-stream');
import _ = require('highland');


const convert = gm({
  blur: {
    radius: 2,
    sigma: 3
  },
  format: 'png'
});

export function downloadFile(uri:string, cb:(data:any) => void) {
  const filename = url.parse(uri).path.split('/').pop();
  const file = fs.createWriteStream(__dirname + '/tmp/' + filename);
  const r = hq(uri);
  r.pipe(convert())
    .pipe(convert.info((err, info) => {
      console.log(err, info);
    }))
    .pipe(file);

  r.on('end', cb);

  //_(hq(uri)).pipe(file).on('end', cb);
}
