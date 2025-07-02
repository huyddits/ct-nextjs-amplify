if (!self.define) {
  let e,
    a = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    a[n] ||
      new Promise(a => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = a), document.head.appendChild(e);
        } else (e = n), importScripts(n), a();
      }).then(() => {
        let e = a[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, s) => {
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[r]) return;
    let o = {};
    const c = e => n(e, r),
      d = { module: { uri: r }, exports: o, require: c };
    a[r] = Promise.all(i.map(e => d[e] || c(e))).then(e => (s(...e), o));
  };
}
define(['./workbox-4754cb34'], function (e) {
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
            cacheWillUpdate: async ({ request: e, response: a, event: n, state: i }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});

// push
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// notification click
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  event.notification.close();
  event.waitUntil(clients.openWindow(process.env.NEXT_PUBLIC_URL));
});
