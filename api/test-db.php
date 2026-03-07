<?php
// Fichier de diagnostic temporaire — À SUPPRIMER après usage !
require_once 'config.php';

$pdo = getDBConnection();

if ($pdo) {
    echo "✅ Connexion DB réussie<br>";
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables : " . implode(', ', $tables) . "<br>";

    $count = $pdo->query("SELECT COUNT(*) FROM admin_users")->fetchColumn();
    echo "Admins en base : " . $count . "<br>";
} else {
    echo "❌ Connexion DB échouée — vérifiez les credentials dans config.php";
}
?>
