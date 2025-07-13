const bcrypt = require('bcrypt');
const db = require('../models/index');
const { User, Store, Rating } = db;

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Rating.destroy({ where: {} });
    await Store.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create Users
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    const users = await User.bulkCreate([
      {
        name: 'Administrator System User',
        email: 'admin@roxiler.com',
        password: hashedPassword,
        address: '123 Admin Street, Tech City, TC 12345',
        role: 'admin'
      },
      {
        name: 'John Smith Store Owner Manager',
        email: 'john@storeowner.com',
        password: hashedPassword,
        address: '456 Business Avenue, Commerce District, CD 67890',
        role: 'store_owner'
      },
      {
        name: 'Sarah Johnson Store Owner Specialist',
        email: 'sarah@storeowner.com',
        password: hashedPassword,
        address: '789 Retail Road, Shopping Center, SC 54321',
        role: 'store_owner'
      },
      {
        name: 'Michael Brown Regular Customer User',
        email: 'michael@customer.com',
        password: hashedPassword,
        address: '321 Customer Lane, User District, UD 98765',
        role: 'user'
      },
      {
        name: 'Emily Davis Premium Customer User',
        email: 'emily@customer.com',
        password: hashedPassword,
        address: '654 Buyer Boulevard, Consumer City, CC 13579',
        role: 'user'
      },
      {
        name: 'David Wilson Regular Customer User',
        email: 'david@customer.com',
        password: hashedPassword,
        address: '987 Shopper Street, Purchase Plaza, PP 24680',
        role: 'user'
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create Stores
    console.log('🏪 Creating stores...');
    const stores = await Store.bulkCreate([
      {
        name: 'Tech Paradise Electronics Store',
        email: 'contact@techparadise.com',
        address: '100 Technology Boulevard, Electronics District, ED 11111',
        owner_id: users[1].id // John Smith
      },
      {
        name: 'Fashion Forward Clothing Boutique',
        email: 'info@fashionforward.com',
        address: '200 Style Street, Fashion Quarter, FQ 22222',
        owner_id: users[1].id // John Smith
      },
      {
        name: 'Gourmet Food Market & Delicatessen',
        email: 'hello@gourmetfood.com',
        address: '300 Culinary Court, Food District, FD 33333',
        owner_id: users[2].id // Sarah Johnson
      },
      {
        name: 'Books & More Academic Bookstore',
        email: 'support@booksandmore.com',
        address: '400 Literature Lane, Education Zone, EZ 44444',
        owner_id: users[2].id // Sarah Johnson
      },
      {
        name: 'Sports Equipment Pro Shop',
        email: 'sales@sportsequipment.com',
        address: '500 Athletic Avenue, Sports Complex, SC 55555',
        owner_id: users[1].id // John Smith
      },
      {
        name: 'Home & Garden Supply Center',
        email: 'orders@homegarden.com',
        address: '600 Domestic Drive, Home Improvement Hub, HH 66666',
        owner_id: users[2].id // Sarah Johnson
      }
    ]);

    console.log(`✅ Created ${stores.length} stores`);

    // Create Ratings
    console.log('⭐ Creating ratings...');
    const ratings = await Rating.bulkCreate([
      // Tech Paradise Electronics Store ratings
      {
        rating: 5,
        user_id: users[3].id, // Michael
        store_id: stores[0].id
      },
      {
        rating: 4,
        user_id: users[4].id, // Emily
        store_id: stores[0].id
      },
      {
        rating: 5,
        user_id: users[5].id, // David
        store_id: stores[0].id
      },

      // Fashion Forward Clothing Boutique ratings
      {
        rating: 4,
        user_id: users[3].id, // Michael
        store_id: stores[1].id
      },
      {
        rating: 5,
        user_id: users[4].id, // Emily
        store_id: stores[1].id
      },

      // Gourmet Food Market ratings
      {
        rating: 5,
        user_id: users[3].id, // Michael
        store_id: stores[2].id
      },
      {
        rating: 4,
        user_id: users[4].id, // Emily
        store_id: stores[2].id
      },
      {
        rating: 5,
        user_id: users[5].id, // David
        store_id: stores[2].id
      },

      // Books & More Academic Bookstore ratings
      {
        rating: 4,
        user_id: users[3].id, // Michael
        store_id: stores[3].id
      },
      {
        rating: 3,
        user_id: users[5].id, // David
        store_id: stores[3].id
      },

      // Sports Equipment Pro Shop ratings
      {
        rating: 5,
        user_id: users[4].id, // Emily
        store_id: stores[4].id
      },
      {
        rating: 4,
        user_id: users[5].id, // David
        store_id: stores[4].id
      },

      // Home & Garden Supply Center ratings
      {
        rating: 4,
        user_id: users[3].id, // Michael
        store_id: stores[5].id
      },
      {
        rating: 5,
        user_id: users[4].id, // Emily
        store_id: stores[5].id
      }
    ]);

    console.log(`✅ Created ${ratings.length} ratings`);

    // Display summary
    console.log('\n📊 Seeding completed successfully!');
    console.log('==================================');
    console.log('Sample Login Credentials:');
    console.log('==================================');
    console.log('🔐 Admin Account:');
    console.log('   Email: admin@roxiler.com');
    console.log('   Password: Admin123!');
    console.log('   Role: admin');
    console.log('');
    console.log('🏪 Store Owner Accounts:');
    console.log('   Email: john@storeowner.com');
    console.log('   Password: Admin123!');
    console.log('   Role: store_owner');
    console.log('   Stores: 3 stores (Tech Paradise, Fashion Forward, Sports Equipment)');
    console.log('');
    console.log('   Email: sarah@storeowner.com');
    console.log('   Password: Admin123!');
    console.log('   Role: store_owner');
    console.log('   Stores: 3 stores (Gourmet Food, Books & More, Home & Garden)');
    console.log('');
    console.log('👤 Customer Accounts:');
    console.log('   Email: michael@customer.com');
    console.log('   Password: Admin123!');
    console.log('   Role: user');
    console.log('');
    console.log('   Email: emily@customer.com');
    console.log('   Password: Admin123!');
    console.log('   Role: user');
    console.log('');
    console.log('   Email: david@customer.com');
    console.log('   Password: Admin123!');
    console.log('   Role: user');
    console.log('==================================');
    console.log('📈 Database Statistics:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Stores: ${stores.length}`);
    console.log(`   Ratings: ${ratings.length}`);
    console.log('==================================');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

// Run the seeder
seedData();
