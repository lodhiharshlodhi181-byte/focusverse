import json

class AvatarSystem:
    """Avatar expression and health management"""
    
    EXPRESSIONS = {
        'energetic': '⚡',
        'happy': '😊',
        'neutral': '😐',
        'tired': '😴',
        'sick': '🤒'
    }
    
    @staticmethod
    def calculate_expression(focus_time, productivity_ratio):
        """Determine avatar expression based on stats"""
        if focus_time > 300:
            return 'energetic'
        elif focus_time > 180:
            return 'happy'
        elif focus_time > 60:
            return 'neutral'
        elif focus_time > 30:
            return 'tired'
        else:
            return 'sick'
    
    @staticmethod
    def calculate_health(productivity_ratio):
        """Calculate health based on productivity ratio"""
        return min(100, int(productivity_ratio * 100))
    
    @staticmethod
    def calculate_level(total_xp):
        """Calculate level from total XP (every 1000 XP = 1 level)"""
        return max(1, total_xp // 1000 + 1)

# Test
if __name__ == "__main__":
    avatar = AvatarSystem()
    
    # Test calculations
    print("Avatar System Tests")
    print("=" * 40)
    
    # Test expression
    expr = avatar.calculate_expression(250, 0.8)
    print(f"Focus 250 min: {expr}")
    
    # Test health
    health = avatar.calculate_health(0.7)
    print(f"Productivity 70%: Health {health}%")
    
    # Test level
    level = avatar.calculate_level(5500)
    print(f"XP 5500: Level {level}")
