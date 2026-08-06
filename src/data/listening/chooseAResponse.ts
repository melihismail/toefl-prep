// Migrated from public/listening/choose-a-response/questions.js.
// audioFile paths were relative to the old page URL; they are now absolute,
// pointing at the clips still served from public/.
import type { ChooseResponseQuestion } from './types.ts';

export const chooseResponseQuestions: ChooseResponseQuestion[] = [
  { id:1, heard:"Didn't I just see you in the library an hour ago?", audioFile:"/listening/choose-a-response/audio/Didn't I just see you in the library an hour ago_.mp3", options:["As a matter of fact, I was returning a book.","Yes, you can find it in the reference section.","I don't think I'll have enough time to do that.","Actually, I think I can get there a little earlier."], answer:0 },
  { id:2, heard:"Where is the nearest bus stop?", audioFile:"/listening/choose-a-response/audio/Where is the nearest bus stop_.mp3", options:["I nearly missed the bus.","Every 30 minutes.","I can help you find it.","I'll take the subway instead."], answer:2 },
  { id:3, heard:"How do I contact customer service?", audioFile:"/listening/choose-a-response/audio/How do I contact customer service_.mp3", options:["Yes, you're allowed to do that.","Use the convenient chat feature.","No, I don't mind.","They provide good service."], answer:1 },
  { id:4, heard:"I'm afraid I'm not available this evening.", audioFile:"/listening/choose-a-response/audio/I'm afraid I'm not available this evening..mp3", options:["Oh, that's too early.","How about tomorrow night then?","She arrived this afternoon.","No, that's not necessary."], answer:1 },
  { id:5, heard:"Isn't the post office open today?", audioFile:"/listening/choose-a-response/audio/Isn't the post office open today_.mp3", options:["No, it's my package.","It's just around the corner!","I think he's come home already.","Let's check the schedule online."], answer:3 },
  { id:6, heard:"If you need me, just text.", audioFile:"/listening/choose-a-response/audio/If you need me, just text..mp3", options:["I can help you with that.","You don't need any more information.","You have a lot of questions, don't you?","You haven't given me your number yet."], answer:3 },
  { id:7, heard:"So the store is open for business all weekend?", audioFile:"/listening/choose-a-response/audio/So the store is open for business all weekend_.mp3", options:["Yes, there is a major power outage.","Yes, it's under renovation.","Yes, it's closed all day on Sunday.","Yes, they're having a huge sale."], answer:2 },
  { id:8, heard:"Did you attend the seminar?", audioFile:"/listening/choose-a-response/audio/Did you attend the seminar_.mp3", options:["I overslept.","No, not very well.","Have you asked your professor?","I forgot to look."], answer:0 }
];
