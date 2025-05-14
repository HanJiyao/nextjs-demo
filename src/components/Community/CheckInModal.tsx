// import { Modal, Button, message } from 'antd';
// import { useContext, useState, useEffect } from 'react';
// import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
// import { CreditsService, UserService, InteractionsService } from '@/client';
// import { CalendarOutlined, FireOutlined, TrophyOutlined } from '@ant-design/icons';
// import FishIcon from '@/components/Common/Icons/FishIcon';

// interface CheckInModalProps {
//   open: boolean;
//   onClose: () => void;
//   autoOpen?: boolean;
// }

// export default function CheckInModal({ open, onClose, autoOpen = false }: CheckInModalProps) {
//   // const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const [alreadyClaimed, setAlreadyClaimed] = useState(false);
//   // const [shouldAutoOpen, setShouldAutoOpen] = useState(autoOpen);

//   // const { data: userData } = useQuery({
//   //   queryKey: ['user-stats', user?.uid],
//   //   queryFn: () => UserService.getCurrentUser(),
//   //   enabled: !!user?.uid
//   // });

//   // useEffect(() => {
//   //   if (userData?.award_taken_time) {
//   //     const lastCheckIn = new Date(userData.award_taken_time._seconds ? 
//   //       userData.award_taken_time._seconds * 1000 : 
//   //       userData.award_taken_time);
//   //     const today = new Date();
      
//   //     const lastCheckInDate = new Date(lastCheckIn.getFullYear(), lastCheckIn.getMonth(), lastCheckIn.getDate());
//   //     const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//   //     const hasClaimedToday = lastCheckInDate.getTime() === todayDate.getTime();
      
//   //     setAlreadyClaimed(hasClaimedToday);
//   //   }
//   // }, [userData]);

//   const rewards = [
//     { day: 1, fishes: 100, bonus: 'Daily Pack' },
//     { day: 2, fishes: 200, bonus: '2x EXP' },
//     { day: 3, fishes: 300, bonus: 'Premium Card' },
//     { day: 4, fishes: 400, bonus: 'Mystery Box' },
//     { day: 5, fishes: 500, bonus: 'Special Avatar' },
//     { day: 6, fishes: 600, bonus: 'VIP Pass (1 day)' },
//     { day: 7, fishes: 1000, bonus: 'Legendary Pack' },
//   ];

//   const checkInMutation = useMutation({
//     mutationFn: () => CreditsService.dailyCheckin({ 
//       requestBody: { userID: user?.uid } 
//     }),
//     onSuccess: (data) => {
//       InteractionsService.addNotification({
//         requestBody: {
//           userID: user.uid,
//           type: "daily_checkin",
//           message: `🎉 Successfully claimed ${data.newCredits - 20} credits! Come back tomorrow for more rewards!`,
//           link: "/community",
//           read: false
//         }
//       });
//       message.success(`Check-in successful! You received 20 credits. Total credits: ${data.newCredits}`);
//       queryClient.invalidateQueries({ queryKey: ['user-stats', 'notifications'] });
//       setAlreadyClaimed(true);
//       onClose();
//     },
//     onError: (error: any) => {
//       if (error.response?.data?.alreadyClaimed) {
//         setAlreadyClaimed(true);
//         message.info('You have already claimed today\'s reward');
//       } else {
//         message.error('Failed to check in');
//       }
//     }
//   });

//   const handleCheckIn = () => {
//     if (!user || alreadyClaimed) return; // 添加 alreadyClaimed 检查
//     checkInMutation.mutate();
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   return (
//     <Modal
//       title={
//         <div className="text-center text-xl font-bold flex items-center justify-center gap-2">
//           <CalendarOutlined className="text-blue-500" />
//           Daily Check-in Rewards
//         </div>
//       }
//       open={open}
//       onCancel={handleClose}
//       width={700}
//       footer={null}
//       className="check-in-modal"
//     >
//       <div className="py-4">
//         <div className="flex items-center justify-center gap-4 mb-6">
//           <FireOutlined className="text-2xl text-orange-500" />
//           <span className="text-lg">Current Streak: <span className="font-bold text-orange-500">3 Days</span></span>
//         </div>

//         <div className="grid grid-cols-7 gap-4 mb-6">
//           {rewards.map((reward, index) => (
//             <div 
//               key={index}
//               className={`relative p-4 border rounded-lg text-center transition-all hover:shadow-lg
//                 ${index <= 2 ? 'bg-gray-100' : 'bg-white'}`}
//             >
//               <div className="text-sm font-bold mb-2">Day {reward.day}</div>
//               <div className="flex flex-col items-center gap-2">
//                 <FishIcon className="text-2xl text-yellow-500" />
//                 <div className="text-xs font-medium text-gray-600">{reward.fishes} Fishes</div>
//                 <div className="text-xs text-blue-500">{reward.bonus}</div>
//               </div>
//               {index <= 2 && (
//                 <div className="absolute -top-2 -right-2">
//                   <TrophyOutlined className="text-green-500" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <Button 
//             type="primary" 
//             size="large"
//             onClick={handleCheckIn}
//             disabled={alreadyClaimed} 
//             loading={checkInMutation.isPending}
//             className={`px-8 h-12 text-lg ${alreadyClaimed ? 'opacity-50 cursor-not-allowed' : ''}`}
//             style={{ 
//               background: alreadyClaimed ? '#d1d5db' : 'linear-gradient(to right, #4f46e5, #7c3aed)',
//               border: 'none'
//             }}
//           >
//             {alreadyClaimed ? 'Already Claimed Today!' : 'Claim Today\'s Rewards!'}
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// } 