# Giới thiệu Project: Ứng dụng Vẽ (Drawing App)

Dưới đây là thông tin tổng quan giới thiệu về project dựa trên cấu trúc các thư mục và mã nguồn hiện tại của ứng dụng.

## 1. Các component có trong project
Trong thư mục `components`, project sử dụng các component tái sử dụng (reusable components) sau:
- **`CustomButton.js`**: Một component nút bấm được tùy chỉnh giao diện, dùng chung cho các nút bấm trong toàn bộ app.
- **`DrawingCanvas.js`**: Component lõi xử lý vùng không gian vẽ, có thể bắt các sự kiện chạm, di chuyển ngón tay (PanResponder) và vẽ lại các nét bằng `react-native-svg`.
- **`ToolBar.js`**: Component thanh công cụ chức năng, cung cấp các lựa chọn như thay đổi màu nét vẽ, độ dày nét vẽ, hoặc các tính năng Undo/Clear trên màn hình vẽ.

## 2. Các loại màn hình (Screen) của project
Trong thư mục `screens`, project có 3 màn hình chính:
- **`HomeScreen.js`**: Màn hình trang chủ của ứng dụng, nơi chào mừng và điều hướng người dùng.
- **`DrawScreen.js`**: Màn hình Studio được sử dụng để tiến hành vẽ tranh. Tích hợp các component như `DrawingCanvas` và `ToolBar`.
- **`GalleryScreen.js`**: Màn hình thư viện nghệ thuật lưu lại những bức tranh người dùng đã vẽ và lưu trữ lại (thông qua AsyncStorage).

## 3. Các loại navigation khác nhau trong project
Thông qua file thiết lập gốc `App.js`, project tích hợp 2 loại navigation từ thư viện `@react-navigation`:
- **Bottom Tab Navigation** (`createBottomTabNavigator`): Được sử dụng để tạo thanh điều hướng nằm ở dưới đáy màn hình, giúp người dùng chuyển đổi qua lại dễ dàng giữa tab **Home** và tab **Gallery**.
- **Stack Navigation** (`createNativeStackNavigator`): Được sử dụng làm điều hướng gốc chứa cụm Bottom Tab (Home, Gallery) và chứa màn hình **Draw**. Khi người dùng bắt đầu vẽ từ Home, app sẽ push màn hình DrawScreen lên trên dưới dạng Stack xếp chồng. 

## 4. Project có sử dụng FlatList không? (Nêu rõ)
**Có sử dụng**. 
- `FlatList` được sử dụng rõ rệt bên trong màn hình **`screens/GalleryScreen.js`**.
- **Mục đích**: `FlatList` nhận dữ liệu (`data={drawings}`) là các nét vẽ được kéo từ bộ nhớ máy (`AsyncStorage`). Nó giúp render danh sách một cách tối ưu để hiển thị các bức tranh dưới dạng thẻ (card). Nó hiển thị ảnh nhỏ (thumbnail) dùng SVG tĩnh và các thông tin chi tiết như: Mã tranh (Canvas #), Màu chủ đạo, Độ dày nét vẽ, và Tổng số nét.

## 5. Có được Style bằng StyleSheet không?
**Có sử dụng StyleSheet hoàn toàn**.
- Tất cả các file UI trong dự án (`HomeScreen`, `DrawScreen`, `GalleryScreen`, `CustomButton`, `DrawingCanvas`, `ToolBar`) đều import module `StyleSheet` từ `react-native`.
- Ở cuối mỗi file, giao diện được khai báo rõ ràng bằng khối lệnh `const styles = StyleSheet.create({...})` để quy định layout flexbox, màu sắc, font chữ và kích thước, quản lý UI tách biệt khỏi logic render.

## 6. Có code trực tiếp trong file App.js không?
**Có code nhưng chỉ dùng cho việc khởi tạo Cấu Hình Điều Hướng**.
- Mã nguồn trong `App.js` được code trực tiếp chuyên dụng cho việc khai báo, cấu hình Navigation tree của React Native cùng thay đổi nhẹ ở `StatusBar`. 
- Trong file `App.js` này mô tả hàm định nghĩa `TabNavigator` tùy chỉnh style của thanh dưới cùng (`backgroundColor: '#0F172A'`), và Component `App` bao bọc tất cả bằng `NavigationContainer` + `Stack.Navigator`. File hoàn toàn không chứa layout code logic hiển thị thủ công và tuân chủ nguyên tắc chia rẽ component rất tốt.
