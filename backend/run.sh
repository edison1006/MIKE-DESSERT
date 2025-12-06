#!/bin/bash

# 检查是否安装了 Python
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# 检查是否安装了 PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "Installing dependencies..."
pip install -r requirements.txt

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please edit .env file and set your database connection and other settings."
fi

# 运行数据库种子脚本（如果需要）
echo "To initialize the database, run: python scripts/seed.py"

# 启动服务器
echo "Starting FastAPI server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000

