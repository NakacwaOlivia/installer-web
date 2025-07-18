import { useState } from 'react';
import macIcon from './assets/mac.svg';
import windowsIcon from './assets/windows.svg';
import linuxIcon from './assets/linux.svg';
import downloadInstaller from './utils/downloadInstaller';

const installers = {
  mac: 'https://ollama.com/download/Ollama.dmg',
  windows: 'https://ollama.com/download/OllamaSetup.exe',
  linux: 'curl -fsSL https://ollama.com/install.sh | sh',
};

const App = () => {
  const [status, setStatus] = useState('');

  const handleInstall = async (os) => {
    setStatus('⬇ Downloading...');
    try {
      await downloadInstaller(installers[os], os);
      setStatus('✅ Installer downloaded. Please open the file to begin installation.');
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  const handleScriptDownload = (os) => {
    let scriptContent = '';
    let fileName = '';
    if (os === 'mac' || os === 'linux') {
      scriptContent = '#!/bin/sh\nollama pull granite3.2-vision:2b\n';
      fileName = os === 'mac' ? 'pull-granite3.2-vision-mac.sh' : 'pull-granite3.2-vision-linux.sh';
    } else if (os === 'windows') {
      scriptContent = '@echo off\nollama pull granite3.2-vision:2b\n';
      fileName = 'pull-granite3.2-vision-windows.bat';
    }
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const platforms = [
    { id: 'mac', label: 'macOS', icon: macIcon },
    { id: 'windows', label: 'Windows', icon: windowsIcon },
    { id: 'linux', label: 'Linux (.deb)', icon: linuxIcon },
  ];

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Ollama Installer</h1>
      <p className="text-lg text-gray-600 mb-6">Choose your platform to download the installer:</p>

      <div className="flex gap-8">
        {platforms.map(p => (
          <div key={p.id} className="flex flex-col items-center">
            <img src={p.icon} alt={p.label} className="h-20 mb-2" />
            <button
              onClick={() => handleInstall(p.id)}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white mb-2"
            >
              Download for {p.label}
            </button>
            <button
              onClick={() => handleScriptDownload(p.id)}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white"
            >
              Download Script for {p.label}
            </button>
          </div>
        ))}
      </div>

      <pre className="mt-6 bg-gray-800 p-4 rounded w-full max-w-xl text-sm text-white">{status}</pre>
    </div>
  );
};

export default App;
