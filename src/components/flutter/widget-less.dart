/// [name]: Materials
/// [author]: xx
/// [@params - describe]: xx

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Materials extends StatelessWidget {
  String describe;

  Materials({
    this.describe,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 15.w),
      child: Text(describe)
    );
  }
}
