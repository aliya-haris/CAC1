function addItem() {
    // Create a new item row
    var itemsContainer = document.getElementById('items-container');
    var newItemRow = document.createElement('div');
    newItemRow.className = 'item-row';
    newItemRow.innerHTML = `
      <input class="item-name" type="text" placeholder="Item Name">
      <input class="item-quantity" type="number" placeholder="Quantity">
      <input class="item-price" type="number" placeholder="Price">
    `;
    itemsContainer.appendChild(newItemRow);
  }
  
  function generateInvoice() {
    // Fetch values from form fields
    var invoiceNumber = document.getElementById('invoice-number').value;
    var invoiceDate = document.getElementById('invoice-date').value;
    var dueDate = document.getElementById('due-date').value;
  
    var billedByName = document.getElementById('billed-name').value;
    var billedByAddress = document.getElementById('billed-address').value;
    var billedByCity = document.getElementById('billed-city').value;
    var billedByState = document.getElementById('billed-state').value;
    var billedByCountry = document.getElementById('billed-country').value;
  
    var clientName = document.getElementById('client-name').value;
    var clientAddress = document.getElementById('client-address').value;
    var clientCity = document.getElementById('client-city').value;
    var clientState = document.getElementById('client-state').value;
    var clientCountry = document.getElementById('client-country').value;
    
        // Validate mandatory fields
    if (
        !invoiceNumber ||
        !invoiceDate ||
        !dueDate ||
        !billedByName ||
        !billedByAddress ||
        !billedByCity ||
        !billedByState ||
        !billedByCountry ||
        !clientName ||
        !clientAddress ||
        !clientCity ||
        !clientState ||
        !clientCountry
    ) {
        alert('Please fill in all mandatory fields.');
        return;
    }
    
    // Fetch items and calculate total
    var items = document.querySelectorAll('.item-row');
    var totalAmount = 0;
  
    items.forEach(function(item) {
      var itemName = item.querySelector('.item-name').value;
      var quantity = parseInt(item.querySelector('.item-quantity').value);
      var price = parseFloat(item.querySelector('.item-price').value);
  
      if (!isNaN(quantity) && !isNaN(price)) {
        totalAmount += quantity * price;
      }
    });
  
    // Fetch GST, Tax, and Discount
    var gstPercentage = parseFloat(document.getElementById('gst').value);
    var taxPercentage = parseFloat(document.getElementById('tax').value);
    var discountPercentage = parseFloat(document.getElementById('discount').value);
  
   // Initialize additional charges to 0
    var gstAmount = 0;
    var taxAmount = 0;
    var discountAmount = 0;

    // Check if the percentages are greater than 0 before calculating
    if (gstPercentage > 0) {
    gstAmount = (gstPercentage / 100) * totalAmount;
    }

    if (taxPercentage > 0) {
    taxAmount = (taxPercentage / 100) * totalAmount;
    }

    if (discountPercentage > 0) {
    discountAmount = (discountPercentage / 100) * totalAmount;
    }

    // Calculate final total
    var finalTotal = totalAmount + gstAmount + taxAmount - discountAmount;
  
    document.getElementById("input-invoice").style.display = "none";

    // Prepare the invoice preview content
    var previewContent = `
      <h2 style="color: purple;">Invoice Preview</h2>
      <p>Invoice: <strong>${invoiceNumber}</strong></p>
      <p>Invoice Date: <strong>${invoiceDate}</strong></p>
      <p>Due Date: <strong>${dueDate}</strong></p>
  
      <div class="flex-container" style="display:flex;">
        <div class="billed-by" style="background-color:rgb(130, 129, 129,0.2); border-radius:5px; justify-content: center;border-radius: 5px;padding:20px;
        margin-top: 20px;padding-top: 20px;">
          <h2 style="color: purple;">Billed By</h2>
          <p style="font-weight:bold;">${billedByName}</p>
          <p style="font-weight:bold;">${billedByAddress}</p>
          <p style="font-weight:bold;">${billedByCity}</p>
          <p style="font-weight:bold;">${billedByState}</p>
          <p style="font-weight:bold;">${billedByCountry}</p>
        </div>
  
        <div class="billed-to" style="background-color:rgb(130, 129, 129,0.2); border-radius:5px;justify-content: center;border-radius: 5px;padding:20px;
        margin-top: 20px;padding-top: 20px; margin-left:30px;">
          <h2 style="color: purple;">Billed To</h2>
          <p style="font-weight:bold;">${clientName}</p>
          <p style="font-weight:bold;">${clientAddress}</p>
          <p style="font-weight:bold;">${clientCity}</p>
          <p style="font-weight:bold;">${clientState}</p>
          <p style="font-weight:bold;">${clientCountry}</p>
        </div>
      </div>
  
     <table style="width: 100%; border-collapse: collapse; margin-top: 20px; text-align: left;">
    <tr style="background-color: purple; color: white;">
        <th style="padding: 15px; border: 1px solid white;">Item Name</th>
        <th style="padding: 15px; border: 1px solid white;">Price</th>
        <th style="padding: 15px; border: 1px solid white;">Quantity</th>
        <th style="padding: 15px; border: 1px solid white;">Amount</th>
    </tr>
    `;
  
    items.forEach(function(item) {
      var itemName = item.querySelector('.item-name').value;
      var quantity = parseInt(item.querySelector('.item-quantity').value);
      var price = parseFloat(item.querySelector('.item-price').value);
      var amount = quantity * price;
  
      previewContent += `
        <tr style="background-color: rgb(130, 129, 129,0.2); color: black;">
          <td> ${itemName}</td>
          <td> ₹ ${price}</td>
          <td> ${quantity}</td>
          <td> ${amount}</td>
        </tr>
      `;
    });
  
    previewContent += `
      </table>
    
      <div class="total-table" style="background-color:rgb(130, 129, 129,0.2); margin-left:420px;width:200px; border-radius:5px;justify-content: center;border-radius: 5px;padding:40px;
      margin-top: 20px;padding-top: 20px;">
      <p>Sub Total: <strong>₹ ${totalAmount}</strong></p>
      <p>GST: <strong>₹ ${gstAmount}</strong></p>
      <p>Tax: <strong>₹ ${taxAmount}</strong></p>
      <p style="color:green;">Discount(${discountPercentage}): <strong>- ₹ ${discountAmount}</strong></p>
      <hr style="border-top: 1px solid #ccc; margin: 10px 0;">
      <p style="font-size:15px;">Total: <strong>₹ ${finalTotal}</strong></p>
      </div>

      <div class="terms" style="margin-top:-150px">
      <h3 style="color:purple;">Terms and Conditions:</h3>
      <p> 1. Payment due within 15 days. <br> Late payments may incur a 14% late fee. <br> 2. Goods/services remain property of the business <br> until full payment received.</p>
      </div>
    `;
  
    // Display the preview
    var invoicePreview = document.getElementById('invoice-preview');
    invoicePreview.innerHTML = previewContent;
    invoicePreview.classList.remove('hidden');
  }
  