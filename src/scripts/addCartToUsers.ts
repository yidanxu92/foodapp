import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import * as dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function addCartToUsers() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // 更新所有没有 cart 字段的用户
    const result = await User.updateMany(
      { cart: { $exists: false } },  // 查找所有没有 cart 字段的用户
      { $set: { cart: [] } }         // 添加空的购物车数组
    );

    console.log(`Migration complete. Updated ${result.modifiedCount} users.`);
    
    // 验证更新
    const users = await User.find({});
    console.log('Sample of updated users:');
    users.slice(0, 3).forEach(user => {
      console.log(`User ${user.email}: cart=${JSON.stringify(user.cart)}`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// 运行迁移
addCartToUsers(); 