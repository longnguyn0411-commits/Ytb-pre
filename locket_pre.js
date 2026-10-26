// Script Locket Advance Bypass
const url = $request.url;
var body = $response.body;

if (body) {
  try {
    // Nếu là gói tin JSON thông thường
    var obj = JSON.parse(body);

    // Xử lý RevenueCat
    if (obj.subscriber) {
      obj.subscriber.subscriptions["locket_gold_year"] = {
        is_sandbox: false,
        ownership_type: "PURCHASED",
        period_type: "normal",
        expires_date: "2099-12-31T23:59:59Z",
        purchase_date: "2024-01-01T00:00:00Z",
        store: "app_store"
      };
      obj.subscriber.entitlements["Gold"] = {
        expires_date: "2099-12-31T23:59:59Z",
        product_identifier: "locket_gold_year",
        purchase_date: "2024-01-01T00:00:00Z"
      };
    }

    // Ep tat ca bien boolean/number lien quan den Video sang trang thai mo
    const forceEnable = (target) => {
      if (typeof target === 'object' && target !== null) {
        for (let key in target) {
          if (key.includes('video') || key.includes('duration') || key.includes('upload') || key.includes('gold')) {
            if (typeof target[key] === 'boolean') target[key] = true;
            if (typeof target[key] === 'number' && target[key] < 30) target[key] = 30;
          }
          if (typeof target[key] === 'object') forceEnable(target[key]);
        }
      }
    };
    forceEnable(obj);

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    // Khi gap goi tin khong phai JSON (ProtoBuf/Binary), tra ve goc de khong bi crash app
    $done({});
  }
} else {
  $done({});
}
