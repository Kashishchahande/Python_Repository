// Digital Notice Board - JavaScript Interactivity

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Live Clock
    initLiveClock();
});

// Update Live Clock in top navigation
function initLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;

    function update() {
        const now = new Date();
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        clockEl.innerHTML = `<i class="fa-regular fa-clock mr-1 text-blue-400"></i> ${now.toLocaleString('en-US', options)}`;
    }

    update();
    setInterval(update, 1000);
}

// Toggle password visibility in Admin Login
function togglePasswordVisibility() {
    const pwd = document.getElementById('password');
    const eye = document.getElementById('passwordEye');
    if (!pwd || !eye) return;

    if (pwd.type === 'password') {
        pwd.type = 'text';
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
    } else {
        pwd.type = 'password';
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
    }
}

// Copy URL to Clipboard in Notice Detail
function copyCurrentUrl() {
    const url = window.location.href;
    const btnText = document.getElementById('copyBtnText');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            if (btnText) {
                const originalText = btnText.innerText;
                btnText.innerText = "Copied!";
                setTimeout(() => {
                    btnText.innerText = originalText;
                }, 2000);
            }
        }).catch(() => {
            prompt("Copy this URL:", url);
        });
    } else {
        prompt("Copy this URL:", url);
    }
}

// Delete Notice Confirmation Modal
function confirmDeleteNotice(noticeId, noticeTitle) {
    const modal = document.getElementById('deleteModal');
    const form = document.getElementById('deleteForm');
    const titleEl = document.getElementById('deleteNoticeTitle');

    if (!modal || !form) return;

    form.action = `/admin/notices/delete/${noticeId}`;
    if (titleEl) {
        titleEl.textContent = `Notice #${noticeId}: ${noticeTitle}`;
    }

    modal.classList.remove('hidden');
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Close modal when pressing Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDeleteModal();
    }
});
