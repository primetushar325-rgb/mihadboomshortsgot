document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // ফাইল আপলোড লজিক (Supabase Storage-এ ছবি সেভ করার জন্য)
    const file = document.getElementById('payment-screenshot').files[0];
    const fileName = `screenshot_${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, file);

    // অর্ডার টেবিলে ডেটা সেভ করা
    const { data, error } = await supabase
        .from('orders')
        .insert([
            { 
                customer_name: document.getElementById('customer-name').value,
                whatsapp_number: document.getElementById('whatsapp-number').value,
                package_name: document.getElementById('package-name').value,
                price: document.getElementById('price').value,
                trx_id: document.getElementById('trx-id').value,
                payment_screenshot_url: fileName,
                status: 'Pending'
            }
        ]);
        
    if (error) alert('Error: ' + error.message);
    else alert('অর্ডার সফল হয়েছে!');
});
