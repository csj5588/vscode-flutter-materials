import 'package:get/get_rx/src/rx_types/rx_types.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';
import 'package:zhixing/base/request/request.dart';
import 'package:zhixing/$path/entity/$3_entity.dart';
import 'package:zhixing/$path/net/$3_net.dart';

class MaterialsController extends GetxController {
  MaterialsController();

  Rx<MaterialsData> rxData = Rx<MaterialsData>(MaterialsData());

  getData() async {
    // [net]
    ZxNetResult result = await MaterialsNet.getData();
    // [judge reponse]
    if (result.success) {
      rxData.value = result.data;
    } else {
      rxData.value = MaterialsData();
    }
  }
}
