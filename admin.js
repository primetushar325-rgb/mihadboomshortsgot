// admin.js - Updated for Payment Settings

// Payment Settings Form Submit Logic
const paymentForm = document.getElementById('payment-settings-form');

if (paymentForm) {
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bkash = document.getElementById('bkash-number').value;
        const nagad = document.getElementById('nagad-number').value;
        const rocket = document.getElementById('rocket-number').value;
        const notice = document.getElementById('payment-notice').value;

        // Supabase-এ ডেটা আপডেট করা
        const { data, error } = await supabase
            .from('site_settings')
            .upsert([
                { 
                    id: 'YOUR_SETTINGS_ID_HERE', // এখানে আপনার ডাটাবেসের নির্দিষ্ট আইডিটি দিন
                    bkash_number: bkash, 
                    nagad_number: nagad, 
                    rocket_number: rocket,
                    payment_notice: notice 
                }
            ]);

        if (error) {
            alert('Error updating settings: ' + error.message);
        } else {
            alert('Payment settings updated successfully!');
        }
    });
}

// Logout Function
function logout() {
    localStorage.removeItem('supabase.auth.token');
    window.location.href = 'index.html';
}document.getElementById('demo-form').addEventListener('submit',async function(e){e.preventDefault();var f=e.currentTarget,b=e.submitter;b.disabled=true;try{var d=formData(f,['title','video_url','thumbnail_url','description','sort_order','active']),file=f.elements.thumbnail_file.files[0];if(file)d.thumbnail_url=await upload(file,'demos');await save('demos',f.elements.id.value,d);reset(f);toast('Demo saved');await loadLists();}catch(x){toast(x.message,true);}finally{b.disabled=false;}});
try{session=JSON.parse(localStorage.getItem('mb_admin_session')||'null');}catch(e){}if(session&&configured())showApp();
})();
/* =========================================
   NEW ADMIN PANEL STYLES (Added for Update)
========================================== */

/* Admin Container Layout */
.admin-container {
    display: flex;
    min-height: 100vh;
    background-color: #f4f7f6;
}

/* Main Content Area */
.main-content {
    flex: 1;
    padding: 20px;
    margin-left: 250px; /* Adjust according to your sidebar width */
    width: calc(100% - 250px);
}

/* Sidebar Active State */
.nav-links li a.active {
    background: rgba(255, 255, 255, 0.2);
    border-left: 4px solid #fff;
    font-weight: bold;
}

/* Dashboard Cards */
.dashboard-cards {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}
.dashboard-cards .card {
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    flex: 1;
    text-align: center;
    border-top: 4px solid #007bff;
}
.dashboard-cards .card h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 18px;
}
.dashboard-cards .card p {
    font-size: 28px;
    font-weight: bold;
    color: #007bff;
}

/* Form Styles for Admin Card */
.admin-card {
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    margin-top: 20px;
    max-width: 600px;
}
.form-group {
    margin-bottom: 20px;
}
.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}
.form-group input[type="text"], 
.form-group input[type="file"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    transition: 0.3s;
}
.form-group input[type="text"]:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Admin Button */
.admin-btn {
    background: #007bff;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
    width: 100%;
}
.admin-btn:hover {
    background: #0056b3;
      }
