export default function apiFetch(url, options, errMessage) {
  const opts = Object.assign({ credentials: 'include' }, options);
  const msg = errMessage || 'Something went wrong.';
  return fetch(url, opts)
    .then((response) => {
      console.log(response);
      if (response.status === 303) {
        console.log(`/account/signout?redirect=${window.location.pathname}`);
        window.location.href = `/account/signout?redirect=${window.location.pathname}`;
      }
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${msg} [Error: ${response.statusText}]`);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
}
