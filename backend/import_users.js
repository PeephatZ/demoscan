import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import User from './models/User.js';

dotenv.config();

// Configuration
const MONGODB_URI = process.env.MONGODB_URI;
const CSV_PATH = process.env.CSV_PATH || '../user.csv';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

async function importUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');

    // Check if CSV file exists
    if (!fs.existsSync(CSV_PATH)) {
      console.error(`❌ CSV file not found: ${CSV_PATH}`);
      process.exit(1);
    }

    console.log(`📁 Reading CSV file: ${CSV_PATH}`);
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const records = parse(csv, { columns: true, skip_empty_lines: true });

    if (records.length === 0) {
      console.log('⚠️  No records found in CSV file');
      return;
    }

    console.log(`📊 Found ${records.length} records in CSV`);

    let team = 1;
    let teamMax = 10;
    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const rec of records) {
      if (!rec.UserID || !rec['ชื่อ - สกุล']) {
        console.log(`⚠️  Skipping record with missing data: ${JSON.stringify(rec)}`);
        errors++;
        continue;
      }
      
      const userId = rec.UserID.trim();
      const name = rec['ชื่อ - สกุล'].trim();
      
      try {
        const result = await User.findOneAndUpdate(
          { userId },
          {
            userId,
            name,
            team,
            base1: 0, base2: 0, base3: 0, base4: 0, base5: 0, base6: 0,
            time1: null, time2: null, time3: null, time4: null, time5: null, time6: null,
            total: 0
          },
          { upsert: true, new: true }
        );
        
        if (result.isNew) {
          imported++;
        } else {
          updated++;
        }
        
        team = team % teamMax + 1;
      } catch (error) {
        console.error(`❌ Error processing user ${userId}:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n📈 Import Summary:`);
    console.log(`   ✅ New users imported: ${imported}`);
    console.log(`   🔄 Existing users updated: ${updated}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📊 Total processed: ${imported + updated + errors}`);
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importUsers(); 