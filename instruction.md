Bạn hãy đóng vai một chuyên gia lập trình React Native và tạo cho tôi toàn bộ mã nguồn của một ứng dụng vẽ (Drawing App) có độ chính xác 100% so với mô tả sau.

**1. Công nghệ & Thư viện (Dependencies):**
- React Native (0.81.5), Expo SDK (~54.0.33)
- Navigation: `@react-navigation/native` (v7), `@react-navigation/bottom-tabs` (v7), `@react-navigation/native-stack` (v7) và các thư viện hỗ trợ như `react-native-safe-area-context`, `react-native-screens`.
- Đồ họa & Cảm ứng: `react-native-svg` (15.12.1), `react-native-gesture-handler`, `react-native-reanimated`.
- Lưu trữ cục bộ: `@react-native-async-storage/async-storage` (2.2.0).

**2. Cấu trúc thư mục nghiêm ngặt (Functional Programming & Components):**
Tất cả component UI phải sử dụng functional code, Hooks (useState, useEffect, useRef) và phải quản lý layout hoàn toàn bằng `StyleSheet.create(...)`.

- `App.js`: Nơi duy nhất triển khai cấu trúc Navigation tree và thay đổi StatusBar. Tuyệt đối không code layout các thành phần UI ở đây. Cấu trúc Navigation bao gồm:
  - Một `Stack.Navigator` bọc toàn bộ.
  - Có một màn hình Bottom Tabs (Tab Navigator) chứa tab "Home" và tab "Gallery". Thanh Tab bar đáy phải thiết lập màu nền (backgroundColor) là `#0F172A`.
  - Có một màn hình "Draw" nằm độc lập trong Stack (không nằm trong thẻ Tab) để có thể Navigate và Push đè lên bằng Stack Navigation khi cần vẽ full-màn hình.
  
- `components/CustomButton.js`: Component nút bấm tùy chỉnh UI tái sử dụng cho các vị trí gọi nút trong app.

- `components/DrawingCanvas.js`: Component lõi đảm nhiệm vùng vẽ. Sử dụng móc bắt sự kiện chạm, di chuyển ngón tay bằng `PanResponder` và vẽ lại các nét liền mạch thông qua thư viện `react-native-svg`.
 
- `components/ToolBar.js`: Component tạo thanh công cụ điều khiển chức năng trong màn hình vẽ. Chứa nút thay đổi màu sắc nét vẽ, thay đổi độ dày nét, nút Undo dể hoàn tác, nút Clear để xóa toàn bộ bản vẽ.

- `screens/HomeScreen.js`: Màn hình giao diện Home chào mừng người dùng, có nút để điều hướng (Navigate lên Draw màn hình hoặc chuyển tab).

- `screens/DrawScreen.js`: Màn hình Studio tổng hợp bao gồm `DrawingCanvas` và `ToolBar`. Sau khi vẽ xong có thể lưu thông tin cấu trúc SVG vào `AsyncStorage`.

- `screens/GalleryScreen.js`: Màn hình dạng thư viện nghệ thuật. 
  - **Bắt buộc dùng `FlatList`**: Kéo dữ liệu (`data`) đã lưu thành mảng mảng từ bộ nhớ (`AsyncStorage`).
- Render list các bức tranh đã hoàn thành dưới dạng Card.
- Trong mỗi card sẽ có hiển thị thumbnail (ảnh thu gọn dùng `react-native-svg` tĩnh tái tạo lại) kèm các thông tin chi tiết: Tên/Mã canvas, Màu chủ đạo nét vẽ, Độ dày, và Tổng số đường nét (path).

Vui lòng cung cấp toàn bộ code cấu trúc file đầy đủ từng dòng cho tất cả các file trong cấu trúc này.