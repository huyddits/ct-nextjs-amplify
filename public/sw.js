if (!self.define) {
  let e,
    a = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
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
  self.define = (n, s) => {
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[r]) return;
    let o = {};
    const c = e => i(e, r),
      d = { module: { uri: r }, exports: o, require: c };
    a[r] = Promise.all(n.map(e => d[e] || c(e))).then(e => (s(...e), o));
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
        { url: '/_next/app-build-manifest.json', revision: '2164af8bfe9fdcf1479ace3a772f16c6' },
        {
          url: '/_next/static/5PP8wjh5Vl_Y0InfCCM9F/_buildManifest.js',
          revision: '3f9dd01a78b1bfacb13de544bc26d0f6',
        },
        {
          url: '/_next/static/5PP8wjh5Vl_Y0InfCCM9F/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/13633bf0-3eaaa8b6e4e8787c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        { url: '/_next/static/chunks/1684-2e2dec21e705faec.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2115-19c94ad20dd21ca3.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2130-9d3cf75cc976c830.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2358-2330e20798d420ab.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2580-d27d728b22e32ad5.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2658-ff96c2d13352c45f.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/2775-ee296a9155278ccb.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/3380-559a8cf080f28d01.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/4383-0680f351ba6843c2.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/4588-053413f18c98324e.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/4698-0ff559dcce6186c9.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        {
          url: '/_next/static/chunks/4bd1b696-3489d4c27b5cbd68.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        { url: '/_next/static/chunks/5381-75abab56112d0176.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/5995-eeda23bd48cbac2c.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/6208-63eb6816f84dc743.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/6307-3b265a427dcc166c.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/6621-be669cfcbcbb7546.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/6874-e36b8f1da5e751de.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/7347-ea15f2de6e8fd916.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/7375-e777abc7a65c2471.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/7948-d02b4705db18a57d.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/8488-baa645e9d59da605.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/8506-48c4af7b68c6e29d.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/8780-af9ac395d2b9ad7b.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/8978-2c10d2a782144cf1.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        { url: '/_next/static/chunks/9402-c97149e291b8b363.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        {
          url: '/_next/static/chunks/app/(auth)/forgot-password/page-8c3bac80b720ab1c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-a1b8354d30bf70e0.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-b0daa0f631ee4e5c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/twitter-callback/page-fe9469b147f9cc91.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/page-349e54f551020d7d.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-d9b63765f6298496.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/about-us/page-d76c4d7250c05c54.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/billing-and-subscription/page-204c2730c0916232.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/layout-9514ce39d65c6337.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/new/page-27b3d977cd501040.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/page-07fbc6d107654a92.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/review/page-23965f626cb6301e.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/submission/page-d199aa74f22cca12.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/check-off/team-data/page-d5ca68328ee38bb7.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/checkout/fail/page-71dfaad9b6f177eb.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/checkout/success/page-8c2752fba848bc8e.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/data/page-96ed40baa5da921e.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/layout-65e4644dfaeb3bfa.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/page-8860ef0a3ff407fe.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/report/page-43fec300971ec0d7.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/%5Bid%5D/edit/page-ac5be4e9e62abdb1.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/new/page-32068f6a52ee62d6.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/hit-miss/routines/page-a0b0b73254fcd0ce.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/home/page-2a182b64d60f686b.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/layout-cc6db35bc4e8dc8a.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/layout-4235469195e47c7c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/new/page-f3364431808c12c8.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/page-a6f614458f6b1e4f.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/past/page-826d9fdd40311b14.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/measurement/team-data/page-35169706acb82340.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/privacy/page-9b46c3a527be55e1.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/profile/page-ee46c2dd9fe8fa8b.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/terms-and-conditions/page-9fed0b073cf02148.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/cardio/page-8f88bf83059a7f33.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/cardio/past/page-d36880113a35a76b.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/layout-bb5150fde6d0b4e4.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/page-5ff8a2e9b76bc120.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/strength/new/page-9c00630aaa006ec9.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/strength/page-a728b516a2a04fe2.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/strength/pastStrength/page-9f626e5dde9e52fb.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/(in-app)/training/team-training-log/page-4deb1cf406bee9f7.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ec52dbeffc043f84.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/layout-6c598cd9acddfe5c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/loading-fe5c2c2e0fd67f9e.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/page-78614d5fa37859b5.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/app/welcome/page-4c502faf38052ece.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/c16f53c3-c87f6f16d84ac2d2.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/framework-313b5ca15313a628.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        { url: '/_next/static/chunks/main-2d566bc9909e89e4.js', revision: '5PP8wjh5Vl_Y0InfCCM9F' },
        {
          url: '/_next/static/chunks/main-app-d6ad2c94058eafb4.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/pages/_app-e29883bd854f83a1.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/pages/_error-35bcff25f5186c17.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-790dba374503620c.js',
          revision: '5PP8wjh5Vl_Y0InfCCM9F',
        },
        { url: '/_next/static/css/6b5f8497807a08a1.css', revision: '6b5f8497807a08a1' },
        { url: '/_next/static/css/715be398208dca58.css', revision: '715be398208dca58' },
        { url: '/_next/static/css/ebdf3955f4e6632b.css', revision: 'ebdf3955f4e6632b' },
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
            cacheWillUpdate: async ({ request: e, response: a, event: i, state: n }) =>
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
