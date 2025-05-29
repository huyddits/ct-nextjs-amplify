if (!self.define) {
  let e,
    a = {};
  const i = (i, s) => (
    (i = new URL(i + '.js', s).href),
    a[i] ||
      new Promise(a => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = a), document.head.appendChild(e);
        } else (e = i), importScripts(i), a();
      }).then(() => {
        let e = a[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, n) => {
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[r]) return;
    let o = {};
    const d = e => i(e, r),
      c = { module: { uri: r }, exports: o, require: d };
    a[r] = Promise.all(s.map(e => c[e] || d(e))).then(e => (n(...e), o));
  };
}
define(['./workbox-cb477421'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/AppImages/android/android-launchericon-144-144.png',
          revision: '638595db6a28ed0991060f62346b1965',
        },
        {
          url: '/AppImages/android/android-launchericon-192-192.png',
          revision: 'bc55c9a11c5d8562e304b95d5f7e1f97',
        },
        {
          url: '/AppImages/android/android-launchericon-48-48.png',
          revision: 'dfc60ae4f13a70de7510fe134a35c80f',
        },
        {
          url: '/AppImages/android/android-launchericon-512-512.png',
          revision: '1c85db582657b4df0ecf3fb09246ce80',
        },
        {
          url: '/AppImages/android/android-launchericon-72-72.png',
          revision: '8cb6f61d8b98a2b4cd60a1219a881186',
        },
        {
          url: '/AppImages/android/android-launchericon-96-96.png',
          revision: 'b989f318f52970f1c5e9ea01da0b0e9a',
        },
        { url: '/AppImages/icons.json', revision: '5dbbc3fe59816e65ba28e355a58ea45c' },
        { url: '/AppImages/ios/100.png', revision: '059043369a1cab9d14a0f7cdf04ad096' },
        { url: '/AppImages/ios/1024.png', revision: '150c1db2e6cf5e8c43557aa2ba89a582' },
        { url: '/AppImages/ios/114.png', revision: '58884f1bfc6b6fc4d32edfb8bf4edcf4' },
        { url: '/AppImages/ios/120.png', revision: '1a505013d804e1c6fbde4e11d6d55c6c' },
        { url: '/AppImages/ios/128.png', revision: '1482401583fd31f1a2110fa943d7d455' },
        { url: '/AppImages/ios/144.png', revision: '638595db6a28ed0991060f62346b1965' },
        { url: '/AppImages/ios/152.png', revision: '90c9b191ecab9f3aa16c0055d8584e9f' },
        { url: '/AppImages/ios/16.png', revision: '6fd43c99c69921f72dd51bb405744b48' },
        { url: '/AppImages/ios/167.png', revision: '56a7fb7de2f5bef2a60e41d012d2b624' },
        { url: '/AppImages/ios/180.png', revision: '5ba4c62af5b6bd12ac69bef4a2db2bac' },
        { url: '/AppImages/ios/192.png', revision: 'bc55c9a11c5d8562e304b95d5f7e1f97' },
        { url: '/AppImages/ios/20.png', revision: 'aeda95adfedc48b3bade223fc3d38d12' },
        { url: '/AppImages/ios/256.png', revision: '2836c08e558822b4ce04f713e6a42ee1' },
        { url: '/AppImages/ios/29.png', revision: 'c630688729df813168e78acf971492f3' },
        { url: '/AppImages/ios/32.png', revision: '3e87faa5f9e3f32b190046c85a1b2667' },
        { url: '/AppImages/ios/40.png', revision: '3b2a0ea2af7ba0c3bd05d50a330bddd7' },
        { url: '/AppImages/ios/50.png', revision: '988152a6e954413fd98ae05fe2fe8c21' },
        { url: '/AppImages/ios/512.png', revision: '1c85db582657b4df0ecf3fb09246ce80' },
        { url: '/AppImages/ios/57.png', revision: 'a56df91e61059a4b2580e384cade90da' },
        { url: '/AppImages/ios/58.png', revision: 'e591fe749035d2860b649e1e7fbd02fd' },
        { url: '/AppImages/ios/60.png', revision: 'fde5490afff85bb4845c79a6f7299b95' },
        { url: '/AppImages/ios/64.png', revision: 'e0f0cea352fc98e9353be42f8d81b66e' },
        { url: '/AppImages/ios/72.png', revision: '8cb6f61d8b98a2b4cd60a1219a881186' },
        { url: '/AppImages/ios/76.png', revision: '1bcc399e92a44e97a3f29849ad740279' },
        { url: '/AppImages/ios/80.png', revision: 'da9329c30f290d35d4a1ff5ced2eda1c' },
        { url: '/AppImages/ios/87.png', revision: '8218a7c44ceaf7b3a0c9e2490baa3fae' },
        {
          url: '/AppImages/windows11/LargeTile.scale-100.png',
          revision: 'af86d3e32fa39359c2c5c4a629557894',
        },
        {
          url: '/AppImages/windows11/LargeTile.scale-125.png',
          revision: '542a801e18bee4671579bff6d9ae4a86',
        },
        {
          url: '/AppImages/windows11/LargeTile.scale-150.png',
          revision: 'a60b13ae388fb53bc64261561ed1db57',
        },
        {
          url: '/AppImages/windows11/LargeTile.scale-200.png',
          revision: '81fc7fc9c1088aa18eb1b893c082fd97',
        },
        {
          url: '/AppImages/windows11/LargeTile.scale-400.png',
          revision: '4c5f51dea0e96a9254365c44746cd493',
        },
        {
          url: '/AppImages/windows11/SmallTile.scale-100.png',
          revision: 'a35d2b770fa1a07d570dd23acec601d6',
        },
        {
          url: '/AppImages/windows11/SmallTile.scale-125.png',
          revision: 'eac2aa36b5a96429d4c62188fd77a529',
        },
        {
          url: '/AppImages/windows11/SmallTile.scale-150.png',
          revision: '9e61e92055c778fe1abf5779be72c561',
        },
        {
          url: '/AppImages/windows11/SmallTile.scale-200.png',
          revision: '670d704d0172b5ba92029ce78c3cdf4e',
        },
        {
          url: '/AppImages/windows11/SmallTile.scale-400.png',
          revision: '204164746ef0eb04e39e26c43d0d5086',
        },
        {
          url: '/AppImages/windows11/SplashScreen.scale-100.png',
          revision: '9d6ab3de3b914d3344bb157fb627cc9d',
        },
        {
          url: '/AppImages/windows11/SplashScreen.scale-125.png',
          revision: '13fe2dc53554fd4c286738fe9179cb75',
        },
        {
          url: '/AppImages/windows11/SplashScreen.scale-150.png',
          revision: '6141cfc4be6e14d704eed972e067deab',
        },
        {
          url: '/AppImages/windows11/SplashScreen.scale-200.png',
          revision: '642853f424260bd54f071701ba5ee5be',
        },
        {
          url: '/AppImages/windows11/SplashScreen.scale-400.png',
          revision: 'c054f44b596bd4ff7f5d525afbe15309',
        },
        {
          url: '/AppImages/windows11/Square150x150Logo.scale-100.png',
          revision: '3bad0a5abab22e34dabe792d4cdf12cf',
        },
        {
          url: '/AppImages/windows11/Square150x150Logo.scale-125.png',
          revision: 'fa29f90e10b4496da1327b3a10b30645',
        },
        {
          url: '/AppImages/windows11/Square150x150Logo.scale-150.png',
          revision: 'c00344aea1e0daf788b978ab6ce09b36',
        },
        {
          url: '/AppImages/windows11/Square150x150Logo.scale-200.png',
          revision: '63f6ebe8758e519bfc01de2c443c06ca',
        },
        {
          url: '/AppImages/windows11/Square150x150Logo.scale-400.png',
          revision: 'be1d7344f79e2925b18737f623c01fec',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.scale-100.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.scale-125.png',
          revision: '32887ca33e4830473b7e78cc88ec65e2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.scale-150.png',
          revision: '23a8da64ad12f1babc7eecdadbcb1aaf',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.scale-200.png',
          revision: 'cb6f58ef6e6431a7163e7f67e557485a',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.scale-400.png',
          revision: '5455409959787ee792404d76b7372f66',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/AppImages/windows11/Square44x44Logo.targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        {
          url: '/AppImages/windows11/StoreLogo.scale-100.png',
          revision: '988152a6e954413fd98ae05fe2fe8c21',
        },
        {
          url: '/AppImages/windows11/StoreLogo.scale-125.png',
          revision: 'b06cd61b224d572b486d17a9cb31a71a',
        },
        {
          url: '/AppImages/windows11/StoreLogo.scale-150.png',
          revision: '49c80cbb0ff1fbc9cad855579ca4bac1',
        },
        {
          url: '/AppImages/windows11/StoreLogo.scale-200.png',
          revision: '059043369a1cab9d14a0f7cdf04ad096',
        },
        {
          url: '/AppImages/windows11/StoreLogo.scale-400.png',
          revision: '9cfb1694c491c4f35afd98bc909e7051',
        },
        {
          url: '/AppImages/windows11/Wide310x150Logo.scale-100.png',
          revision: 'a28d78e5329a58abbbeb07579fe0eea3',
        },
        {
          url: '/AppImages/windows11/Wide310x150Logo.scale-125.png',
          revision: '459a18f63c0cbef96722adaf8badb148',
        },
        {
          url: '/AppImages/windows11/Wide310x150Logo.scale-150.png',
          revision: '03b53d11f74b5f3c312ebd4de20c0b30',
        },
        {
          url: '/AppImages/windows11/Wide310x150Logo.scale-200.png',
          revision: '9d6ab3de3b914d3344bb157fb627cc9d',
        },
        {
          url: '/AppImages/windows11/Wide310x150Logo.scale-400.png',
          revision: '642853f424260bd54f071701ba5ee5be',
        },
        { url: '/_next/app-build-manifest.json', revision: 'd5c24cfa93c05ae5ec1c4fa3786e0038' },
        {
          url: '/_next/static/chunks/13633bf0-05997933d1131971.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        { url: '/_next/static/chunks/1427-db6eed263e0660f4.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/1684-aa76ea3439d6613b.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/1719-c7aff4455e662ce9.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/1829-a707e84a3956b1e0.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/2130-d6eb5ed0af76b14d.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/2658-09634fcbaf896e70.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/3380-49a9527836778d20.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        {
          url: '/_next/static/chunks/4bd1b696-9e79bd07140259de.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        { url: '/_next/static/chunks/5020-aeb89c09f84bd68e.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/5385-efe14ca835d125b6.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/6307-4030e5e0b848e452.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/6757-aeb3e1225d7be939.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/6874-2b9b63d39190e953.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/6902-29d85daaeaf7e865.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/7152-26a31b6490cde2d4.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/7208-96f4deb66a86f043.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/7347-fba9bd5b3d690757.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/807-04e01244e3950e07.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/8310-b661a87e8da82e99.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        { url: '/_next/static/chunks/8780-c068196db32a44f3.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        {
          url: '/_next/static/chunks/app/(auth)/forgot-password/page-f10c6921f096277a.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-8f95769166cde700.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-8e54d8684ba2f8cf.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/twitter-callback/page-73e11ff1a04ae263.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/page-aa2b92e4f54dedaf.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-481d7f4f6e4baa96.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/about-us/page-53de54280836a71e.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/billing-and-subscription/page-2ee15a06fe2612ab.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/layout-d0972c1f8cb34336.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/new/page-7386583e751e8adc.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/page-792399ed9c3814a6.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/review/page-73003e08089cb075.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/submission/page-f32401d877c676ec.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/team-data/page-21382dd2bf67b033.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/checkout/fail/page-7c71d67c04f605c4.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/checkout/success/page-2ccd0d2dfc743e25.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/data/page-c8d46250d0d6c575.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/layout-77ccefb72576a336.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/page-243978b25ca8152c.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/report/page-28e22dfdf4c18c9b.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/%5Bid%5D/edit/page-ba1cef541c7935c9.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/new/page-5c1c54798dee7d54.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/page-1aec16fbb1a02cde.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/home/page-699d1c9a814b3c51.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/layout-13f02935ababa8ca.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/layout-74a9eae83a172ec9.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/new/page-4c1118952b159799.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/page-763f304cc70224b9.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/past/page-364779a6d59afe16.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/team-data/page-129bd643809b8d05.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/privacy/page-e4bfd8606c84f408.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/profile/page-f92e4ad8018e968a.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/term-and-conditions/page-12647f1a9a4f98de.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/cardio/page-97309e0e7a63bf2d.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/cardio/past/page-32693fa881afc97d.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/layout-4e5b8fee126d0108.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/page-acf7010aa842329d.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/strength/page-e0ba7bb861d44583.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/team-training-log/page-8c77d32a328da263.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-b483f5138eea1ea1.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/layout-999eea2b0f219ec9.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/loading-b0749b9957ccba27.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/page-4dd5839615473b13.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/app/welcome/page-63030a546e14fb66.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/c16f53c3-88e4bb57fb9a5c85.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/framework-313b5ca15313a628.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        { url: '/_next/static/chunks/main-2d566bc9909e89e4.js', revision: 'vCHPtaUulx_i2w0d11QIf' },
        {
          url: '/_next/static/chunks/main-app-d6ad2c94058eafb4.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/pages/_app-e29883bd854f83a1.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/pages/_error-35bcff25f5186c17.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-72ddbb9c5c364168.js',
          revision: 'vCHPtaUulx_i2w0d11QIf',
        },
        { url: '/_next/static/css/52f37798ef5aa69f.css', revision: '52f37798ef5aa69f' },
        { url: '/_next/static/css/ebdf3955f4e6632b.css', revision: 'ebdf3955f4e6632b' },
        { url: '/_next/static/css/f30152c0704fba31.css', revision: 'f30152c0704fba31' },
        {
          url: '/_next/static/media/569ce4b8f30dc480-s.p.woff2',
          revision: 'ef6cefb32024deac234e82f932a95cbd',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/_next/static/vCHPtaUulx_i2w0d11QIf/_buildManifest.js',
          revision: '8576f29f4b6c8e79e92ef72a839b946a',
        },
        {
          url: '/_next/static/vCHPtaUulx_i2w0d11QIf/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/android/android-launchericon-144-144.png',
          revision: '638595db6a28ed0991060f62346b1965',
        },
        {
          url: '/android/android-launchericon-192-192.png',
          revision: 'bc55c9a11c5d8562e304b95d5f7e1f97',
        },
        {
          url: '/android/android-launchericon-48-48.png',
          revision: 'dfc60ae4f13a70de7510fe134a35c80f',
        },
        {
          url: '/android/android-launchericon-512-512.png',
          revision: '1c85db582657b4df0ecf3fb09246ce80',
        },
        {
          url: '/android/android-launchericon-72-72.png',
          revision: '8cb6f61d8b98a2b4cd60a1219a881186',
        },
        {
          url: '/android/android-launchericon-96-96.png',
          revision: 'b989f318f52970f1c5e9ea01da0b0e9a',
        },
        { url: '/apple-touch-icon-precomposed.png', revision: '656411953dc68f4b56ce30bcc095d5fa' },
        { url: '/apple-touch-icon.png', revision: '656411953dc68f4b56ce30bcc095d5fa' },
        { url: '/favicon-cheer-trainer.ico', revision: '065b1dec72a9d3e0a158eca6b79cd71c' },
        { url: '/favicon.ico', revision: '2a2a75d953df9f370daf10e51b139c34' },
        { url: '/favicon.svg', revision: '1fe6aef72471c7d96880ec49055fa134' },
        { url: '/icons/icon-16x16.jpg', revision: 'e6e71f2a2489626057a7e5dedabae674' },
        { url: '/icons/icon-192x192.jpg', revision: 'e6e71f2a2489626057a7e5dedabae674' },
        { url: '/icons/icon-32x32.jpg', revision: 'e6e71f2a2489626057a7e5dedabae674' },
        { url: '/icons/icon-512x512.jpg', revision: 'e6e71f2a2489626057a7e5dedabae674' },
        { url: '/ios/100.png', revision: '059043369a1cab9d14a0f7cdf04ad096' },
        { url: '/ios/1024.png', revision: '150c1db2e6cf5e8c43557aa2ba89a582' },
        { url: '/ios/114.png', revision: '58884f1bfc6b6fc4d32edfb8bf4edcf4' },
        { url: '/ios/120.png', revision: '1a505013d804e1c6fbde4e11d6d55c6c' },
        { url: '/ios/128.png', revision: '1482401583fd31f1a2110fa943d7d455' },
        { url: '/ios/144.png', revision: '638595db6a28ed0991060f62346b1965' },
        { url: '/ios/152.png', revision: '90c9b191ecab9f3aa16c0055d8584e9f' },
        { url: '/ios/16.png', revision: '6fd43c99c69921f72dd51bb405744b48' },
        { url: '/ios/167.png', revision: '56a7fb7de2f5bef2a60e41d012d2b624' },
        { url: '/ios/180.png', revision: '5ba4c62af5b6bd12ac69bef4a2db2bac' },
        { url: '/ios/192.png', revision: 'bc55c9a11c5d8562e304b95d5f7e1f97' },
        { url: '/ios/20.png', revision: 'aeda95adfedc48b3bade223fc3d38d12' },
        { url: '/ios/256.png', revision: '2836c08e558822b4ce04f713e6a42ee1' },
        { url: '/ios/29.png', revision: 'c630688729df813168e78acf971492f3' },
        { url: '/ios/32.png', revision: '3e87faa5f9e3f32b190046c85a1b2667' },
        { url: '/ios/40.png', revision: '3b2a0ea2af7ba0c3bd05d50a330bddd7' },
        { url: '/ios/50.png', revision: '988152a6e954413fd98ae05fe2fe8c21' },
        { url: '/ios/512.png', revision: '1c85db582657b4df0ecf3fb09246ce80' },
        { url: '/ios/57.png', revision: 'a56df91e61059a4b2580e384cade90da' },
        { url: '/ios/58.png', revision: 'e591fe749035d2860b649e1e7fbd02fd' },
        { url: '/ios/60.png', revision: 'fde5490afff85bb4845c79a6f7299b95' },
        { url: '/ios/64.png', revision: 'e0f0cea352fc98e9353be42f8d81b66e' },
        { url: '/ios/72.png', revision: '8cb6f61d8b98a2b4cd60a1219a881186' },
        { url: '/ios/76.png', revision: '1bcc399e92a44e97a3f29849ad740279' },
        { url: '/ios/80.png', revision: 'da9329c30f290d35d4a1ff5ced2eda1c' },
        { url: '/ios/87.png', revision: '8218a7c44ceaf7b3a0c9e2490baa3fae' },
        { url: '/logo.jpg', revision: 'e6e71f2a2489626057a7e5dedabae674' },
        { url: '/manifest.json', revision: '764cfea11905fd8519011536e9aa77ad' },
        { url: '/offline.html', revision: 'f437148e375d5e0ff0604fa44a3b5d88' },
        { url: '/touch-icon-ipad-retina.png', revision: '56a7fb7de2f5bef2a60e41d012d2b624' },
        { url: '/touch-icon-ipad.png', revision: '90c9b191ecab9f3aa16c0055d8584e9f' },
        { url: '/touch-icon-iphone-retina.png', revision: '5ba4c62af5b6bd12ac69bef4a2db2bac' },
        { url: '/windows11/LargeTile.scale-100.png', revision: 'af86d3e32fa39359c2c5c4a629557894' },
        { url: '/windows11/LargeTile.scale-125.png', revision: '542a801e18bee4671579bff6d9ae4a86' },
        { url: '/windows11/LargeTile.scale-150.png', revision: 'a60b13ae388fb53bc64261561ed1db57' },
        { url: '/windows11/LargeTile.scale-200.png', revision: '81fc7fc9c1088aa18eb1b893c082fd97' },
        { url: '/windows11/LargeTile.scale-400.png', revision: '4c5f51dea0e96a9254365c44746cd493' },
        { url: '/windows11/SmallTile.scale-100.png', revision: 'a35d2b770fa1a07d570dd23acec601d6' },
        { url: '/windows11/SmallTile.scale-125.png', revision: 'eac2aa36b5a96429d4c62188fd77a529' },
        { url: '/windows11/SmallTile.scale-150.png', revision: '9e61e92055c778fe1abf5779be72c561' },
        { url: '/windows11/SmallTile.scale-200.png', revision: '670d704d0172b5ba92029ce78c3cdf4e' },
        { url: '/windows11/SmallTile.scale-400.png', revision: '204164746ef0eb04e39e26c43d0d5086' },
        {
          url: '/windows11/SplashScreen.scale-100.png',
          revision: '9d6ab3de3b914d3344bb157fb627cc9d',
        },
        {
          url: '/windows11/SplashScreen.scale-125.png',
          revision: '13fe2dc53554fd4c286738fe9179cb75',
        },
        {
          url: '/windows11/SplashScreen.scale-150.png',
          revision: '6141cfc4be6e14d704eed972e067deab',
        },
        {
          url: '/windows11/SplashScreen.scale-200.png',
          revision: '642853f424260bd54f071701ba5ee5be',
        },
        {
          url: '/windows11/SplashScreen.scale-400.png',
          revision: 'c054f44b596bd4ff7f5d525afbe15309',
        },
        {
          url: '/windows11/Square150x150Logo.scale-100.png',
          revision: '3bad0a5abab22e34dabe792d4cdf12cf',
        },
        {
          url: '/windows11/Square150x150Logo.scale-125.png',
          revision: 'fa29f90e10b4496da1327b3a10b30645',
        },
        {
          url: '/windows11/Square150x150Logo.scale-150.png',
          revision: 'c00344aea1e0daf788b978ab6ce09b36',
        },
        {
          url: '/windows11/Square150x150Logo.scale-200.png',
          revision: '63f6ebe8758e519bfc01de2c443c06ca',
        },
        {
          url: '/windows11/Square150x150Logo.scale-400.png',
          revision: 'be1d7344f79e2925b18737f623c01fec',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        {
          url: '/windows11/Square44x44Logo.scale-100.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/windows11/Square44x44Logo.scale-125.png',
          revision: '32887ca33e4830473b7e78cc88ec65e2',
        },
        {
          url: '/windows11/Square44x44Logo.scale-150.png',
          revision: '23a8da64ad12f1babc7eecdadbcb1aaf',
        },
        {
          url: '/windows11/Square44x44Logo.scale-200.png',
          revision: 'cb6f58ef6e6431a7163e7f67e557485a',
        },
        {
          url: '/windows11/Square44x44Logo.scale-400.png',
          revision: '5455409959787ee792404d76b7372f66',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-16.png',
          revision: '8a03d7a282fd56fd8570b920129e0ecf',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-20.png',
          revision: '5c69008b78e004f46dd2853e14ada6cc',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-24.png',
          revision: '9c3f1f016cf345d02121a8d14992eb79',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-256.png',
          revision: '35a8eb50181fffb817f62a2ac6441326',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-30.png',
          revision: '0983a99cf7753ca831907b51759d268a',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-32.png',
          revision: 'a703e9df460ea55d42d673ac3155b695',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-36.png',
          revision: '3a49c96da970b1ad5e417dcf9c638ba2',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-40.png',
          revision: 'e45297f990a01577a8ed20c8fb4346ac',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-44.png',
          revision: '43477103f96632c1520f3b69af52e68e',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-48.png',
          revision: '95bbc5e1f1be2acea7d7cbd3214ec8c1',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-60.png',
          revision: '8b08f7b5e5e411b8f6c07c6df7bdf257',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-64.png',
          revision: '7ce506cb9d5dc1485c77ce8f4e0dd4f2',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-72.png',
          revision: '211279b32eeabd1770a8ea5d1e8e8160',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-80.png',
          revision: '95e0cb35ea7367e5afd9c03d5d6a0de6',
        },
        {
          url: '/windows11/Square44x44Logo.targetsize-96.png',
          revision: '15da1667eb7893cad8822f52dbf2c4ab',
        },
        { url: '/windows11/StoreLogo.scale-100.png', revision: '988152a6e954413fd98ae05fe2fe8c21' },
        { url: '/windows11/StoreLogo.scale-125.png', revision: 'b06cd61b224d572b486d17a9cb31a71a' },
        { url: '/windows11/StoreLogo.scale-150.png', revision: '49c80cbb0ff1fbc9cad855579ca4bac1' },
        { url: '/windows11/StoreLogo.scale-200.png', revision: '059043369a1cab9d14a0f7cdf04ad096' },
        { url: '/windows11/StoreLogo.scale-400.png', revision: '9cfb1694c491c4f35afd98bc909e7051' },
        {
          url: '/windows11/Wide310x150Logo.scale-100.png',
          revision: 'a28d78e5329a58abbbeb07579fe0eea3',
        },
        {
          url: '/windows11/Wide310x150Logo.scale-125.png',
          revision: '459a18f63c0cbef96722adaf8badb148',
        },
        {
          url: '/windows11/Wide310x150Logo.scale-150.png',
          revision: '03b53d11f74b5f3c312ebd4de20c0b30',
        },
        {
          url: '/windows11/Wide310x150Logo.scale-200.png',
          revision: '9d6ab3de3b914d3344bb157fb627cc9d',
        },
        {
          url: '/windows11/Wide310x150Logo.scale-400.png',
          revision: '642853f424260bd54f071701ba5ee5be',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: a, event: i, state: s }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https?.*/,
      new e.NetworkFirst({
        cacheName: 'offlineCache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 200 })],
      }),
      'GET'
    );
});
