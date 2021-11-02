import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:get/instance_manager.dart';
import 'package:zhixing/widgets/title_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:zhixing/$path/controller/$3_controller.dart';

class Materials extends StatefulWidget {
  @override
  MaterialsState createState() {
    return MaterialsState();
  }
}

class MaterialsState extends State<Materials> {
  MaterialsController _controller = MaterialsController();

  @override
  void initState() {
    // [initialze controller]
    this._controller = GetInstance().putOrFind(
      () => MaterialsController(),
    );
    // [request]
    // _controller.getData();

    super.initState();
  }

  @override
  void dispose() {
    Get.delete<MaterialsController>();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF3F4F9),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TitleBar('Materials'),
          Container(
            padding: EdgeInsets.all(15.w),
            child: Text('Materials')
          ),
        ]
      )
    );
  }
}
