import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 20),
        child: SafeArea(
          child: Center(
            child: Column(
              children: const [
                CircleAvatar(
                    foregroundImage: AssetImage('images/chick.jpg'),
                    radius: 100),
                SizedBox(height: 30),
                Text('Welcome to my party!!!',
                    style: TextStyle(
                        fontSize: 25,
                        fontFamily: 'Roboto',
                        fontWeight: FontWeight.w500)),
                SizedBox(height: 15),
                Card(
                  child: ListTile(
                    leading: Icon(Icons.email),
                    title: Text('email@gmail.com'),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
