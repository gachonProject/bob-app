// export default function swDev() {
//   function determineAppServerKey() {
//     const vapidPublicKey =
//       "AAAA3r7ybGE:APA91bGaiuF4HEMtFaEMySHlQdMF6JkD8m_f7itaLj2ozwkG8qABh7_qwyf0K3tYSgkPZNnPixCwS_kpY1K_hKSa1ggNWg1N78_a0Cv5v2mWvvTjSp9yIiqAt4N6tlwX9bLZVEXrhK0e";
//     return urlBase64ToUint8Array(vapidPublicKey);
//   }

//   function urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }

//   let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
//   navigator.serviceWorker.register(swUrl).then((response) => {
//     console.warn("response", response);

//     return response.pushManager.getSubscription().then(function (subscription) {
//       response.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: determineAppServerKey(),
//       });
//     });
//   });
// }
