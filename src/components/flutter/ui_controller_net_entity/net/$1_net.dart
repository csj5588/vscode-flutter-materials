import 'package:wt_utils/map_util.dart';
import 'package:zhixing/base/request/request.dart';
import 'package:zhixing/$path/entity/$3_entity.dart';

class MaterialsNet {
  ///请求 列表请求
  static Future<ZxNetResult> getData() async {
    // [params]
    Map map = {};
    // [request]
    throw 'if has request, del this line!';
    ZXResponseModel res = await request.get(map, '/your/apis');
    // [intercept]
    if (res.isSuccessful && WTMapUtil.isNotEmpty(res.data)) {
      // [transform]
      MaterialsData entity = MaterialsData.fromJson(res.data);

      return ZxNetResult(true, entity);
    }
    
    return ZxNetResult(false, null, errorMsg: res.responseMsg);
  }
}
