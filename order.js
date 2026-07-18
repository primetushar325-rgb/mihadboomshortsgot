const orderForm = document.getElementById('order-form');
const submitBtn = document.getElementById('submit-btn');

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    const orderData = {
        customer_name: document.getElementById('customer-name').value,
        whatsapp_number: document.getElementById('whatsapp-number').value,
        package_name: document.getElementById('package-name').value,
        price: parseInt(document.getElementById('price').value),
        trx_id: document.getElementById('trx-id').value,
        status: 'Pending'
    };

    try {
        const { data, error } = await supabase.from('orders').insert([orderData]);
        if (error) throw error;
        
        alert('অর্ডার সফলভাবে জমা হয়েছে!');
        orderForm.reset();
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Order";
    }
});
