var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
// 每次打包发版时 要将老版本号补充到content中
var content = {
  '1.0.0': '1.0.0',
  '1.0.1': '1.0.1'
};
if (!content[version]) content[version] = version;
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
