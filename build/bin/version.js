var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
// 每次打包发版时 要将老版本号补充到content中
var content = { '1.0': '1.0', '1.1.3': '1.1.3', '1.2.0': '1.2.0', '1.2.1': '1.2.1', '1.2.2': '1.2.2', '1.2.3': '1.2.3', '1.2.4': '1.2.4', '1.2.5': '1.2.5' };
if (!content[version]) content[version] = version;
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
