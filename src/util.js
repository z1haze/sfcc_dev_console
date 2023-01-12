import { toast } from 'vue3-toastify';

export const runCode = (code, maxDepth) => {
    if (!code) return;

    const data = new URLSearchParams();

    data.append('code', code);
    data.append('maxDepth', maxDepth);

    return fetch(`${window.urlPath}`, {
        method: 'POST',
        body: data
    })
        .then((response) => response.json())
};

export const showMessage = (type, content, callback = null) => {
    toast(content, {
        type,
        autoClose: (typeof callback === 'function') ? 7500 : 3500,
        onClose: (typeof callback === 'function') ? callback : null
    });
};

export const checkForUpdate = async () => {
    const url = 'https://github.com/z1haze/sfcc_dev_console/releases/latest';
    const response = await fetch(url);

    const latestVersion = response.url.split('/').pop();
    const currentVersion = __APP_VERSION__;

    if (parseFloat(latestVersion) > parseFloat(currentVersion)) {
        showMessage('info', `Update Available ( ${latestVersion} )`, () => window.open(url));
    }

    localStorage.setItem('lastUpdateCheck', new Date().getTime().toString());
}