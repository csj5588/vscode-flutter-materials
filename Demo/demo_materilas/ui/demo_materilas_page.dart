import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:get/instance_manager.dart';
import 'package:zhixing/widgets/title_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:zhixing/undefined/controller/demo_materilas_controller.dart';

class DemoMaterilas extends StatefulWidget {
  @override
  DemoMaterilasState createState() {
    return DemoMaterilasState();
  }
}

class DemoMaterilasState extends State<DemoMaterilas> {
  DemoMaterilasController _controller;

  @override
  void initState() {
    // [initialze controller]
    this._controller = GetInstance().putOrFind(
      () => DemoMaterilasController(),
    );
    // [request]
    _controller.getData();

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF3F4F9),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TitleBar('DemoMaterilas'),
          Container(
            padding: EdgeInsets.all(15.w),
            child: Text('DemoMaterilas')
          ),
        ]
      )
    );
  }
}
