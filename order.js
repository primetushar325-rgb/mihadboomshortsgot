// order.js - ডাটাবেসে অর্ডার পাঠানোর লজিক
const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // বাটন ডিজেবল করে দেওয়া যাতে ডাবল অর্ডার না হয়
    const submitBtn = e.target.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        // ফর্ম থেকে ডেটা নেওয়া
        const orderData = {
            customer_name: document.getElementById('customer-name').value,
            whatsapp_number: document.getElementById('whatsapp-number').value,
            package_name: document.getElementById('package-name').value,
            price: parseInt(document.getElementById('price').value),
            trx_id: document.getElementById('trx-id').value,
            status: 'Pending'
        };

        // Supabase-এ ডেটা পাঠানো
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData]);

        if (error) throw error;

        alert('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
        orderForm.reset();
        
        // এখানে আমরা পরে হোয়াটসঅ্যাপের লজিক যোগ করব
    } catch (err) {
        alert('অর্ডারে সমস্যা হয়েছে: ' + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Order";
    }
});
