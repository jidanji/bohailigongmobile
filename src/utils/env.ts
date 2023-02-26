function buildEnv() {
  const host = window.location.host;

  if (['pbl.hunnu.edu.cn'].includes(host)) {
    return 'prod';
  } else if (['127.0.0.1', 'localhost'].includes(host)) {
    return 'development';
  }
  return 'development';
}
export default buildEnv();
