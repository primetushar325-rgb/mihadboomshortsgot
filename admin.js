async function loadOrders() {
    const { data, error } = await supabase.from('orders').select('*');
    if (data) {
        const container = document.getElementById('order-list');
        if(container) {
            container.innerHTML = data.map(o => `
                <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                    <p>নাম: ${o.customer_name} | প্যাকেজ: ${o.package_name}</p>
                    <p>ট্রানজেকশন: ${o.trx_id} | স্ট্যাটাস: ${o.status}</p>
                </div>
            `).join('');
        }
    }
}
window.onload = loadOrders;

    if (data) {
        document.getElementById('bkash-number').value = data.bkash_number || '';
        document.getElementById('nagad-number').value = data.nagad_number || '';
        document.getElementById('rocket-number').value = data.rocket_number || '';
        document.getElementById('payment-notice').value = data.payment_notice || '';
    }
}

// ৩. ডেমো ফর্ম এবং অন্যান্য লজিক (আপনার আগের কোড)
document.getElementById('demo-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    var f = e.currentTarget, b = e.submitter;
    b.disabled = true;
    try {
        var d = formData(f, ['title', 'video_url', 'thumbnail_url', 'description', 'sort_order', 'active']),
            file = f.elements.thumbnail_file.files[0];
        if (file) d.thumbnail_url = await upload(file, 'demos');
        await save('demos', f.elements.id.value, d);
        reset(f);
        toast('Demo saved');
        await loadLists();
    } catch (x) {
        toast(x.message, true);
    } finally {
        b.disabled = false;
    }
});

// ৪. সেশন চেক এবং লোড
let session;
try {
    session = JSON.parse(localStorage.getItem('mb_admin_session') || 'null');
} catch (e) {}

window.onload = function() {
    loadPaymentSettings();
    if (session && typeof configured === 'function' && configured()) showApp();
};

// ৫. Logout Function
function logout() {
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('mb_admin_session');
    window.location.href = 'index.html';
}
