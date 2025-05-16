import os
import gzip

def create_gz_file(filename, size_mb):
    # Convert MB to bytes (1 MB = 1024 * 1024 bytes)
    size_bytes = size_mb * 1024 * 1024
    # Generate random bytes
    data = os.urandom(size_bytes)
    # Create gzip file
    with gzip.open(filename, 'wb') as f:
        f.write(data)
    # Get the compressed file size
    compressed_size = os.path.getsize(filename) / (1024 * 1024)  # Convert to MB
    print(f"Created {filename} with uncompressed size {size_mb}MB (compressed size ~{compressed_size:.2f}MB)")

# Create gzip files with uncompressed sizes of 30MB, 50MB, and 80MB
create_gz_file('file_30mb.gz', 30)
create_gz_file('file_31mb.gz', 31)
create_gz_file('file_32mb.gz', 32)
create_gz_file('file_33mb.gz', 33)
create_gz_file('file_50mb.gz', 50)
create_gz_file('file_80mb.gz', 80)