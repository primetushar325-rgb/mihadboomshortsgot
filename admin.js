// admin.js - Full Integrated Version

// ১. পেমেন্ট সেটিংস সেভ করার লজিক
const paymentForm = document.getElementById('payment-settings-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bkash = document.getElementById('bkash-number').value;
        const nagad = document.getElementById('nagad-number').value;
        const rocket = document.getElementById('rocket-number').value;
        const notice = document.getElementById('payment-notice').value;

        // আপডেট করা (এখানে আপনার সঠিক ID বা query ব্যবহার করুন)
        const { data, error } = await supabase
            .from('site_settings')
            .upsert([
                { 
                    id: 'YOUR_SETTINGS_ID_HERE', 
                    bkash_number: bkash, 
                    nagad_number: nagad, 
                    rocket_number: rocket,
                    payment_notice: notice 
                }
            ]);

        if (error) alert('Error updating settings: ' + error.message);
        else alert('Payment settings updated successfully!');
    });
}

// ২. প্যানেল লোড হওয়ার সময় ডাটাবেস থেকে সেটিংস দেখানো
async function loadPaymentSettings() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

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
