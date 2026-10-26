// Locket Gold & 30s Video Script
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var body = $response.body;

if (body) {
  try {
    var obj = JSON.parse(body);

    // 1. Phân đoạn RevenueCat (Unlock Gold)
    if (obj.subscriber) {
      obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

      var locket02 = {
        is_sandbox: false,
        ownership_type: "PURCHASED",
        billing_issues_detected_at: null,
        period_type: "normal",
        expires_date: "2099-12-18T01:04:17Z",
        grace_period_expires_date: null,
        unsubscribe_detected_at: null,
        original_purchase_date: "2024-07-28T01:04:18Z",
        purchase_date: "2024-07-28T01:04:17Z",
        store: "app_store"
      };

      var dohungx = {
        grace_period_expires_date: null,
        purchase_date: "2024-07-28T01:04:17Z",
        product_identifier: "locket_gold_year",
        expires_date: "2099-12-18T01:04:17Z"
      };

      const match = Object.keys(mapping).find(e => ua.includes(e));

      if (match) {
        let [e, s] = mapping[match];
        if (s) {
          dohungx.product_identifier = s;
          obj.subscriber.subscriptions[s] = locket02;
        } else {
          obj.subscriber.subscriptions["locket_gold_year"] = locket02;
        }
        obj.subscriber.entitlements[e] = dohungx;
      } else {
        obj.subscriber.subscriptions["locket_gold_year"] = locket02;
        obj.subscriber.entitlements.Gold = dohungx;
        obj.subscriber.entitlements.pro = dohungx;
      }
    }

    // 2. Phân đoạn Server Locket (Mở khóa Video 30s & Upload)
    if (obj.max_video_duration !== undefined) obj.max_video_duration = 30;
    if (obj.video_duration_limit !== undefined) obj.video_duration_limit = 30;
    if (obj.can_upload_video !== undefined) obj.can_upload_video = true;
    if (obj.allow_video_upload !== undefined) obj.allow_video_upload = true;

    if (obj.config) {
      obj.config.max_video_duration = 30;
      obj.config.video_duration_limit = 30;
      obj.config.can_upload_video = true;
      obj.config.allow_video_upload = true;
    }

    if (obj.result) {
      if (obj.result.max_video_duration !== undefined) obj.result.max_video_duration = 30;
      if (obj.result.can_upload_video !== undefined) obj.result.can_upload_video = true;
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}
