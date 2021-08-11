import 'package:get/get_rx/src/rx_types/rx_types.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';
import 'package:zhixing/base/request/request.dart';
import 'package:zhixing/undefined/entity/demo_materilas_entity.dart';
import 'package:zhixing/undefined/net/demo_materilas_net.dart';

class DemoMaterilasController extends GetxController {
  DemoMaterilasController();

  Rx<DemoMaterilasData> rxData = Rx<DemoMaterilasData>();

  getData() async {
    // [net]
    ZxNetResult result = await DemoMaterilasNet.getData();
    // [judge reponse]
    if (result.success) {
      rxData.value = result.data;
    } else {
      rxData.value = DemoMaterilasData();
    }
  }
}
