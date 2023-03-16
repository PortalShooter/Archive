import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'models/Item.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const Meditation(),
    );
  }
}

class Meditation extends StatefulWidget {
  const Meditation({super.key});

  @override
  _MeditationState createState() => _MeditationState();
}

class _MeditationState extends State {
  final AudioPlayer _player = AudioPlayer();
  int? playIndex;
  bool isPlay = false;

  final List<Item> listItem = [
    Item(
        name: 'Forest',
        audioPath: 'assets/audio/forest.mp3',
        imagePath: 'assets/images/forest.jpeg'),
    Item(
        name: 'Night',
        audioPath: 'assets/audio/night.mp3',
        imagePath: 'assets/images/night.jpeg'),
    Item(
        name: 'Ocean',
        audioPath: 'assets/audio/ocean.mp3',
        imagePath: 'assets/images/ocean.jpeg'),
    Item(
        name: 'Waterfall',
        audioPath: 'assets/audio/waterfall.mp3',
        imagePath: 'assets/images/waterfall.jpeg'),
    Item(
        name: 'Wind',
        audioPath: 'assets/audio/wind.mp3',
        imagePath: 'assets/images/wind.jpeg'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SafeArea(
            child: ListView.builder(
                itemCount: listItem.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Container(
                      height: 100,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        image: DecorationImage(
                          fit: BoxFit.cover,
                          image: AssetImage(listItem[index].imagePath),
                        ),
                      ),
                      child: ListTile(
                        title: Text(
                          listItem[index].name,
                          style: const TextStyle(color: Colors.white),
                        ),
                        leading: IconButton(
                          onPressed: () {
                            if (playIndex == index) {
                              _player.stop();
                              setState(() {
                                isPlay = false;
                                playIndex = null;
                              });
                            } else {
                              _player.setAsset(listItem[index].audioPath);
                              _player.play();
                              setState(() {
                                isPlay = true;
                                playIndex = index;
                              });
                            }
                          },
                          icon: playIndex == index
                              ? const Icon(
                                  Icons.stop,
                                  color: Colors.white,
                                )
                              : const Icon(
                                  Icons.play_arrow,
                                  color: Colors.white,
                                ),
                        ),
                      ),
                    ),
                  );
                })),
      ),
    );
  }
}
