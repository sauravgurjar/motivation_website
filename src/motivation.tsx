import React, { useState, useEffect, ReactNode } from 'react';
import {
    Sun,
    Moon,
    Plus,
    Check,
    Trash2,
    Target,
    TrendingUp,
    Calendar,
    Flame,
    Award,
    RefreshCw,
    Heart
} from 'lucide-react';

// Type definitions
interface Goal {
    id: number;
    text: string;
    completed: boolean;
    streak: number;
}

interface ApiResponse {
    reason: string;
    lang: string;
}

interface CardProps {
    children: ReactNode;
    className?: string;
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

interface ButtonProps {
    children: ReactNode;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

interface ProgressProps {
    value: number;
    className?: string;
}

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'secondary' | 'success';
    className?: string;
}

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    color: string;
}

// Custom UI Components (shadcn/ui inspired)
const Card: React.FC<CardProps> = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => (
    <div className={`p-6 pb-4 ${className}`}>
        {children}
    </div>
);

const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = "default",
                                           size = "default",
                                           className = "",
                                           onClick,
                                           disabled,
                                           ...props
                                       }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
        default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
        destructive: "bg-red-600 text-white hover:bg-red-700"
    };

    const sizes: Record<string, string> = {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className = "" }) => (
    <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        } ${className}`}
        onClick={() => onCheckedChange(!checked)}
    >
    <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
        }`}
    />
    </button>
);

const Progress: React.FC<ProgressProps> = ({ value, className = "" }) => (
    <div className={`h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
        <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
    </div>
);

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
    const variants: Record<string, string> = {
        default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
    );
};

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center">
                <Icon className={`h-8 w-8 ${color}`} />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

// Main App Component
const MotivationalDashboard: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [currentQuote, setCurrentQuote] = useState<string>('');
    const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(false);
    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, text: "Drink 8 glasses of water", completed: false, streak: 3 },
        { id: 2, text: "Read 10 pages", completed: true, streak: 7 },
        { id: 3, text: "Exercise for 30 minutes", completed: false, streak: 2 },
        { id: 4, text: "Practice gratitude", completed: true, streak: 5 }
    ]);
    const [newGoal, setNewGoal] = useState<string>('');
    const [showAddGoal, setShowAddGoal] = useState<boolean>(false);

    // Sample quotes for demonstration
    const sampleQuotes: string[] = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Life is what happens to you while you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It is during our darkest moments that we must focus to see the light. - Aristotle",
        "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
    ];

    const fetchQuote = async (): Promise<void> => {
        setIsLoadingQuote(true);
        try {
            const response = await fetch('https://hope.passarelli.dev/reasons');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ApiResponse = await response.json();
            setCurrentQuote(data.reason);
            console.log('Fetched from API:', data);
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to sample quotes if API fails
            const randomQuote = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
            setCurrentQuote(randomQuote);
        } finally {
            setIsLoadingQuote(false);
        }
    };

    const toggleGoal = (id: number): void => {
        setGoals(goals.map(goal =>
            goal.id === id
                ? { ...goal, completed: !goal.completed, streak: goal.completed ? goal.streak : goal.streak + 1 }
                : goal
        ));
    };

    const addGoal = (): void => {
        if (newGoal.trim()) {
            const newGoalObj: Goal = {
                id: Date.now(),
                text: newGoal,
                completed: false,
                streak: 0
            };
            setGoals([...goals, newGoalObj]);
            setNewGoal('');
            setShowAddGoal(false);
        }
    };

    const deleteGoal = (id: number): void => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addGoal();
        }
    };

    useEffect(() => {
        fetchQuote();
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Computed values
    const completedGoals: number = goals.filter(goal => goal.completed).length;
    const totalGoals: number = goals.length;
    const completionPercentage: number = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
    const totalStreak: number = goals.reduce((sum, goal) => sum + goal.streak, 0);
    const currentLevel: number = Math.floor(totalStreak / 10) + 1;

    const formatDate = (): string => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            StayStrong Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {formatDate()}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <Switch
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                            />
                            <Moon className="h-4 w-4" />
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Target}
                        title="Goals Today"
                        value={`${completedGoals}/${totalGoals}`}
                        color="text-blue-600 dark:text-blue-400"
                    />
                    <StatCard
                        icon={Flame}
                        title="Total Streak"
                        value={totalStreak}
                        color="text-orange-600 dark:text-orange-400"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="Progress"
                        value={`${Math.round(completionPercentage)}%`}
                        color="text-green-600 dark:text-green-400"
                    />
                    <StatCard
                        icon={Award}
                        title="Level"
                        value={currentLevel}
                        color="text-purple-600 dark:text-purple-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Daily Quote */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                                    Daily Inspiration
                                </h2>
                                <Button variant="outline" size="sm" onClick={fetchQuote} disabled={isLoadingQuote}>
                                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingQuote ? 'animate-spin' : ''}`} />
                                    New Quote
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                                {isLoadingQuote ? (
                                    <div className="flex items-center justify-center">
                                        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                                    </div>
                                ) : (
                                    <blockquote className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed">
                                        "{currentQuote}"
                                    </blockquote>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Goals Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                                    Today's Goals
                                </h2>
                                <Button size="sm" onClick={() => setShowAddGoal(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Goal
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {goals.map((goal) => (
                                    <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleGoal(goal.id)}
                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                    goal.completed
                                                        ? 'bg-green-600 border-green-600 text-white'
                                                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                                                }`}
                                                aria-label={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
                                            >
                                                {goal.completed && <Check className="w-3 h-3" />}
                                            </button>
                                            <span className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {goal.text}
                      </span>
                                            {goal.streak > 0 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    <Flame className="w-3 h-3 mr-1" />
                                                    {goal.streak}
                                                </Badge>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteGoal(goal.id)}
                                            aria-label={`Delete goal: ${goal.text}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}

                                {showAddGoal && (
                                    <div className="flex gap-2 mt-4">
                                        <input
                                            type="text"
                                            value={newGoal}
                                            onChange={(e) => setNewGoal(e.target.value)}
                                            placeholder="Enter a new goal..."
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onKeyPress={handleKeyPress}
                                            autoFocus
                                        />
                                        <Button onClick={addGoal}>Add</Button>
                                        <Button variant="ghost" onClick={() => setShowAddGoal(false)}>Cancel</Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Progress Section */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                                Progress Tracker
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        <span>Daily Completion</span>
                                        <span>{Math.round(completionPercentage)}%</span>
                                    </div>
                                    <Progress value={completionPercentage} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedGoals}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalGoals - completedGoals}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalStreak}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Streak Days</div>
                                    <div className="text-xs text-gray-500 mt-1">Keep it up! 🔥</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
                    <p className="mb-2">Remember: Progress, not perfection. You've got this! 💪</p>
                    <p className="text-sm">Every small step counts towards your bigger goals.</p>
                </footer>
            </div>
        </div>
    );
};

export default MotivationalDashboard;