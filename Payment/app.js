// public/app.js

document.getElementById('payButton').addEventListener('click', async function () {
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 10000, // Example amount in paise (10000 paise = ₹100)
        currency: 'INR',
      }),
    });
  
    const order = await response.json();
  
    const options = {
      key: 'your_key_id',
      amount: order.amount,
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Product Description',
      image: 'your_logo_url',
      order_id: order.id,
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '1234567890',
      },
      theme: {
        color: '#4299e1',
      },
    };
  
    const rzp = new Razorpay(options);
    rzp.open();
  });
  