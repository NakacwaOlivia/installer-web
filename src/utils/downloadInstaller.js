const downloadInstaller = (url, os) => {
  return new Promise((resolve, reject) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `ollama-${os}-installer`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    resolve();
  });
};

export default downloadInstaller;
