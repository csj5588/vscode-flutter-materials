import 'package:wt_utils/map_util.dart';
import 'package:zhixing/base/request/request.dart';
import 'package:zhixing/undefined/entity/demo_materilas_entity.dart';

class DemoMaterilasNet {
  ///请求 列表请求
  static Future<ZxNetResult> getData() async {
    // [params]
    Map map = {};
    // [request]
    ZXResponseModel res = await request.get(map, '/your/apis');
    // [intercept]
    if (res.isSuccessful && WTMapUtil.isNotEmpty(res.data)) {
      // [transform]
      DemoMaterilasData entity = DemoMaterilasData.fromJson(res.data);

      return ZxNetResult(true, entity);
    }
    
    return ZxNetResult(false, null, errorMsg: res.responseMsg);
  }
}
