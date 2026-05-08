import { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Send, TrendingUp, 
  Clock, Users, Bookmark 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useCommunityStore, useAuthStore } from '../store';

function Community() {
  const { posts, likePost, addComment, addPost } = useCommunityStore();
  const { user } = useAuthStore();
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTab, setSelectedTab] = useState<'latest' | 'popular' | 'following'>('latest');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const tabs = [
    { id: 'latest' as const, label: '最新', icon: Clock },
    { id: 'popular' as const, label: '热门', icon: TrendingUp },
    { id: 'following' as const, label: '关注', icon: Users },
  ];

  const handlePost = () => {
    if (!newPostContent.trim() || !user) return;
    
    const newPost = {
      id: `post-${Date.now()}`,
      author: user,
      language: 'english' as const,
      title: '分享我的学习心得',
      content: newPostContent,
      likes: 0,
      comments: [],
      tags: ['学习心得'],
      createdAt: new Date(),
    };
    
    addPost(newPost);
    setNewPostContent('');
  };

  const handleComment = (postId: string) => {
    if (!commentInputs[postId]?.trim() || !user) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      author: user,
      content: commentInputs[postId],
      likes: 0,
      createdAt: new Date(),
    };
    
    addComment(postId, comment);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return new Date(date).toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt={user?.username || 'User'}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="分享你的学习心得..."
                    className="w-full p-4 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-all">
                        📚 学习心得
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all">
                        ❓ 提问
                      </button>
                    </div>
                    <button
                      onClick={handlePost}
                      disabled={!newPostContent.trim()}
                      className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-all ${
                      selectedTab === tab.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={post.author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={post.author.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{post.author.username}</span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors ml-auto">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <img
                            src={comment.author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                            alt={comment.author.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900">
                                {comment.author.username}
                              </span>
                              <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input */}
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={user?.username || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                      placeholder="写下你的评论..."
                      className="flex-1 px-4 py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                热门话题
              </h3>
              <div className="space-y-3">
                {[
                  { tag: '英语学习', posts: 234 },
                  { tag: '日语N2备考', posts: 189 },
                  { tag: '韩语发音技巧', posts: 156 },
                  { tag: '每日打卡', posts: 145 },
                  { tag: '学习方法分享', posts: 123 },
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <span className="text-gray-700 font-medium">#{topic.tag}</span>
                    <span className="text-gray-500 text-sm">{topic.posts}帖</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
               活跃学习者
              </h3>
              <div className="space-y-4">
                {[
                  { name: '英语达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1', streak: 45 },
                  { name: '日语小仙女', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2', streak: 38 },
                  { name: '韩语学习者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3', streak: 32 },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">🔥 连续学习{user.streak}天</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">学习小组</h3>
              <div className="space-y-3">
                {[
                  { name: '英语口语练习群', members: 1234 },
                  { name: '日语N2备考小组', members: 856 },
                  { name: '韩语入门交流群', members: 567 },
                ].map((group, index) => (
                  <button
                    key={index}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all text-left flex items-center justify-between"
                  >
                    <span className="font-medium">{group.name}</span>
                    <span className="text-xs opacity-80">{group.members}人</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
