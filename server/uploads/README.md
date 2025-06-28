# Uploads Directory

This directory stores user-uploaded files, primarily profile pictures.

## Structure
- Profile pictures are stored with unique filenames
- Files are served statically via `/uploads/` endpoint
- Old files are automatically deleted when replaced

## File Naming
- Format: `timestamp-randomnumber.extension`
- Example: `1703123456789-123456789.jpg`

## Security
- Only image files are accepted
- Files are validated on upload
- No file size limits (configurable)

## Access
- Files are accessible via: `http://localhost:5000/uploads/filename`
- Used in profile picture URLs stored in database 