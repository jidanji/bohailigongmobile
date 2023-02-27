function buildEnv() {
  const host = window.location.host;

  if (['112.126.83.123'].includes(host)) {
    return 'prod';
  } else if (['127.0.0.1', 'localhost'].includes(host)) {
    return 'development';
  }
  return 'development';
}
export default buildEnv();
