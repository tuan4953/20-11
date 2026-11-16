export const CODE_WISHES = [
  {
    id: "javascript",
    name: "JavaScript / TypeScript",
    icon: "⚡",
    badge: "Modern Frontend & Node",
    filename: "GratitudePromise.ts",
    code: `import { Mentor, Student, LifeLesson } from '@codegym/mentorship';

/**
 * 20/11 Tri Ân Giảng Viên & Mentor CodeGym
 * Khi lòng biết ơn được viết bằng những dòng code
 */
async function celebrateTeachersDay(mentor: Mentor): Promise<void> {
  const student = new Student({ fromScratch: true, passion: Infinity });
  
  // Hành trình từ con số 0 đến ngày tốt nghiệp
  while (student.isGrowing) {
    try {
      const challenge = await student.encounterBug();
      const guidance: LifeLesson = await mentor.guideWithPatience(challenge);
      
      student.absorb(guidance);
      student.confidence += 100;
    } catch (exhaustion) {
      // Mentor luôn là try...catch vững chắc nhất
      await mentor.sendWarmEncouragement("Em làm tốt lắm, cố thêm chút nữa!");
    }
  }

  // Kết quả sau những tháng ngày tại CodeGym
  const result = {
    cleanCodeMindset: true,
    bugOvercomingSpirit: true,
    eternalGratitude: Number.POSITIVE_INFINITY,
    message: "Kính chúc Thầy/Cô và các Mentor luôn tràn đầy nhiệt huyết và sức khỏe! 💙"
  };

  return console.log("🎉 Tri ân 20/11: Compiled with 0 errors, 100% Love!", result);
}`,
    shortMessage: "Chúc Thầy Cô và các Mentor luôn có vô số nguồn cảm hứng, compilation luôn 0 error, và tình yêu nghề luôn là hằng số const bất biến!"
  },
  {
    id: "java",
    name: "Java (Spring Boot)",
    icon: "☕",
    badge: "Enterprise & OOP Powerhouse",
    filename: "GratitudeService.java",
    code: `package com.codegym.gratitude;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class GratitudeService implements TeacherAppreciationService {

    @Autowired
    private CodeGymMentor mentor;

    @Autowired
    private StudentSoul student;

    @Override
    public AppreciationPayload celebrateNov20() {
        // Khởi tạo trái tim tri ân
        AppreciationPayload payload = new AppreciationPayload();
        
        // Thầy Cô là dependency không thể thiếu trong hành trình nghề nghiệp
        payload.setMentorName(mentor.getFullName());
        payload.setPatienceLevel(Double.POSITIVE_INFINITY);
        payload.setBugsFixedCount(mentor.getLifetimeBugsCrushed());
        
        // Tiêm (Inject) tri thức và ngọn lửa đam mê
        mentor.injectPassion(student);
        mentor.refactorThinking(student.getLogic());
        
        payload.setWish("Kính chúc Thầy/Cô 20/11 luôn dồi dào sức khỏe, hạnh phúc, và luôn là bệ phóng vững chãi cho hàng nghìn lứa học viên CodeGym!");
        payload.setStatus("SUCCESS: 200 OK - FOREVER GRATEFUL");

        return payload;
    }
}`,
    shortMessage: "Thầy Cô là Dependency quý giá nhất được Inject vào cuộc đời chúng em. Kính chúc Thầy Cô luôn 200 OK và ngập tràn hạnh phúc!"
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    badge: "Clean, Elegant & AI Ready",
    filename: "tri_an_20_11.py",
    code: `"""
Tri ân Giảng viên & Mentor CodeGym nhân ngày 20/11
Chạm Phím Tri Ân - Từ thụ động đến làm chủ công nghệ
"""

class CodeGymJourney:
    def __init__(self, mentor, student):
        self.mentor = mentor
        self.student = student
        self.gratitude_score = float('inf')

    def compile_memories(self):
        memories = [
            "Lần đầu tiên gõ print('Hello World')",
            "Những đêm debug Capstone cùng Mentor lúc 1 giờ sáng",
            "Nụ cười rạng rỡ khi bài tập 'All Tests Passed'",
            "Lời động viên kịp thời khi muốn buông xuôi"
        ]
        return {
            "mentor": self.mentor,
            "dedication": "100%",
            "lessons_learned": len(memories),
            "status": "Forever Inspired 💙"
        }

if __name__ == "__main__":
    tribute = CodeGymJourney(mentor="Thầy Cô CodeGym", student="Học viên nhiệt huyết")
    print("=" * 60)
    print("CHÚC MỪNG NGÀY NHÀ GIÁO VIỆT NAM 20/11!")
    print(tribute.compile_memories())
    print("Biết ơn những dòng code Thầy Cô đã đồng hành và chỉ dạy!")
    print("=" * 60)`,
    shortMessage: "Trong từ điển (dictionary) của học viên CodeGym, 'Mentor' luôn có value là 'Tận tâm' và key là 'Yêu thương'. Chúc mừng 20/11 Thầy Cô!"
  },
  {
    id: "csharp",
    name: "C# (.NET)",
    icon: "🔷",
    badge: "Robust & Architecture Driven",
    filename: "MentorAppreciation.cs",
    code: `using System;
using System.Threading.Tasks;
using CodeGym.Mentorship.Core;

namespace CodeGym.TriAn2011
{
    public class MentorAppreciation
    {
        public static async Task Main(string[] args)
        {
            var mentor = new CodeGymMentor("Thầy Cô Dẫn Đường");
            var student = new AspiringDeveloper();

            Console.WriteLine(">>> Bắt đầu chương trình tri ân 20/11...");

            // Học cách tư duy như một kỹ sư thực thụ
            await mentor.CoachAsync(student, timeSpan: TimeSpan.FromDays(180));

            var tributeCard = new
            {
                Event = "Ngày Nhà giáo Việt Nam 20/11",
                Target = mentor.Name,
                Attribute = "Kiên nhẫn vô tận & Tâm huyết vô song",
                Wish = "Chúc Thầy Cô dồi dào sức khỏe, an khang thịnh vượng, tiếp tục truyền lửa cho các thế hệ dev trẻ!"
            };

            Console.WriteLine($"[STATUS: COMPLETED] {tributeCard.Wish}");
        }
    }
}`,
    shortMessage: "Kính chúc Thầy Cô luôn sở hữu Runtime mạnh mẽ, Garbage Collection cuốn sạch mọi mệt mỏi, chỉ giữ lại niềm vui và sự tự hào!"
  },
  {
    id: "sql",
    name: "SQL",
    icon: "🗄️",
    badge: "Data Truth & Timeless Gratitude",
    filename: "query_gratitude.sql",
    code: `-- Truy vấn lòng biết ơn gửi Giảng viên & Mentor CodeGym 20/11
SELECT 
    m.mentor_name AS "Người_Thầy_Đáng_Kính",
    COUNT(b.bug_id) AS "Số_Lỗi_Đã_Cứu_Học_Viên",
    'Vô hạn' AS "Mức_Độ_Kiên_Nhẫn",
    '100%' AS "Tâm_Huyết_Truyền_Nghề",
    'Chúc mừng Ngày Nhà giáo Việt Nam 20/11 💙' AS "Thông_Điệp_Tri_Ân"
FROM codegym_mentors m
LEFT JOIN student_bugs b ON m.mentor_id = b.rescued_by_mentor_id
JOIN codegym_classes c ON m.class_id = c.id
WHERE m.dedication = 'UNCONDITIONAL'
GROUP BY m.mentor_id, m.mentor_name
ORDER BY m.hearts_received DESC;

-- COMMIT TRANSACTION; Lòng biết ơn đã được lưu vĩnh viễn vào hệ cơ sở dữ liệu!`,
    shortMessage: "Dữ liệu có thể biến động theo thời gian, nhưng lòng biết ơn của chúng em dành cho Thầy Cô là khóa chính PRIMARY KEY bất biến!"
  },
  {
    id: "php",
    name: "PHP (Laravel)",
    icon: "🐘",
    badge: "Web Artisan Spirit",
    filename: "GratitudeController.php",
    code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Mentor;
use App\\Models\\Student;
use Illuminate\\Http\\JsonResponse;

class GratitudeController extends Controller
{
    public function celebrateTeacherDay(Mentor $mentor): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'celebration' => '20/11 - Ngày Nhà giáo Việt Nam',
            'mentor' => $mentor->name,
            'skills_unlocked' => [
                'Clean Code Mindset',
                'Debugging under Pressure',
                'Teamwork & Git Mastery',
                'Confidence to Build the Future'
            ],
            'message' => 'Cảm ơn Thầy Cô đã không chỉ dạy chúng em viết code, mà còn dạy chúng em cách trở thành người kỹ sư tử tế và trách nhiệm!'
        ]);
    }
}`,
    shortMessage: "Cảm ơn Thầy Cô đã artisan từng nét tư duy, migrate lòng tự tin và route chúng em đến bến đỗ sự nghiệp mơ ước!"
  },
  {
    id: "htmlcss",
    name: "HTML / CSS",
    icon: "🎨",
    badge: "Visual Heartbeat & Layout",
    filename: "heart_for_mentor.html",
    code: `<!-- 20/11: Khi tình cảm được render trực tiếp từ trái tim -->
<div class="mentor-heart-card">
  <div class="banner">CODEGYM 20/11 - CHẠM PHÍM TRI ÂN</div>
  <h1 class="gradient-text">Kính Gửi Thầy Cô & Mentor</h1>
  <p class="description">
    Từng thẻ div Thầy nắn nót chỉ bảo,<br/>
    Từng dòng CSS Cô kiên nhẫn căn lề.<br/>
    Dẫu sau này biển công nghệ bốn bề,<br/>
    Ơn Thầy Cô em mãi hoài ghi nhớ!
  </p>
  <button class="btn-gratitude">💙 Gửi Trọn Yêu Thương</button>
</div>

<style>
.mentor-heart-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  animation: heartPulse 1.2s infinite ease-in-out;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
}
</style>`,
    shortMessage: "Thầy Cô đã align-items chúng em với tương lai và justify-content cho những ước mơ công nghệ đong đầy ý nghĩa!"
  }
];

export const INITIAL_WALL_MESSAGES = [
  {
    id: "msg-1",
    author: "Nguyễn Hải Long",
    batch: "Lớp Java Fullstack",
    avatar: "👨‍💻",
    tag: "Kỷ niệm thức khuya",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    content: "Còn nhớ đợt làm đồ án Capstone, 12h đêm thầy Cấn Tuấn Anh vẫn vào Google Meet gỡ bug hộ nhóm em. Không có thầy chắc giờ này em vẫn đang vật lộn với logic! Em chúc thầy luôn mạnh khỏe và mãi nhiệt huyết ạ!",
    likes: 42,
    date: "16/11/2026",
    sticker: "☕"
  },
  {
    id: "msg-2",
    author: "Trần Thị Mai Anh",
    batch: "Lớp Frontend ReactJS",
    avatar: "👩‍💻",
    tag: "Lời cảm ơn",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    content: "Em vốn là dân trái ngành nhảy sang học IT, những tuần đầu khóc ròng vì tưởng mình không hợp. Nhờ cô Lý Diệu Hoa và cô Hằng Bùi kiên nhẫn cầm tay chỉ việc, giờ em đã đi làm Frontend Dev được 6 tháng rồi. Biết ơn các Cô và CodeGym rất nhiều!",
    likes: 58,
    date: "15/11/2026",
    sticker: "❤️"
  },
  {
    id: "msg-3",
    author: "Lê Quốc Bảo",
    batch: "Bootcamp Python & Backend",
    avatar: "🚀",
    tag: "Chuyện vui phòng lab",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    content: "Thầy Tùng bảo: 'Em mà còn commit code kiểu update fix bug final ver 3 nữa là phạt 20 cái chống đẩy'. Từ đó em viết commit message chuẩn đét. Chúc thầy 20/11 thật nhiều niềm vui và học viên ngoan ngoãn!",
    likes: 35,
    date: "14/11/2026",
    sticker: "🐛"
  },
  {
    id: "msg-4",
    author: "Team 4 'Cú Đêm'",
    batch: "Lớp Fullstack Web",
    avatar: "🦉",
    tag: "Lời hứa vượt môn",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    content: "Nhóm em xin gửi lời tri ân tới Thầy Phan Luân và Cô Tạ Hằng! Chúng em xin hứa đồ án cuối kỳ này sẽ đạt điểm A+ và đem lại niềm tự hào cho các Thầy/Cô. Chúc toàn thể giảng viên CodeGym một mùa 20/11 ấm áp!",
    likes: 29,
    date: "13/11/2026",
    sticker: "🌟"
  }
];
